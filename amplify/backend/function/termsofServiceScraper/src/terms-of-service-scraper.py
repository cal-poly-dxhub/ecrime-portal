import requests
from bs4 import BeautifulSoup
import re
from nltk.tokenize import RegexpTokenizer
import nltk
nltk.download('stopwords')
import json
from bs4.element import Comment
from urllib.request import Request, urlopen

class Highlight:
    def __init__(self, id, txt, rel_score):
        # def __init__(self, id, txt, freq_dict, rel_score):

        self.id = id
        self.txt = txt
        # self.freq_dict = freq_dict
        self.rel_score = rel_score

def tag_visible(element):
    if element.parent.name in ['style', 'script', 'head', 'title', 'meta', '[document]']:
        return False
    if isinstance(element, Comment):
        return False
    return True
def text_from_html(soup):
    texts = soup.findAll(text=True)
    visible_texts = filter(tag_visible, texts)
    return " \n".join(t.strip() for t in visible_texts)

def get_bag_of_words(url):
    req = Request(url)
    html = urlopen(req).read()
    soup = BeautifulSoup(html, 'html.parser')
    text = text_from_html(soup)

    tokenizer = RegexpTokenizer('\w+')
    tokens = tokenizer.tokenize(text)
    words = []
    for word in tokens:
        words.append(word.lower())

    sw = nltk.corpus.stopwords.words('english')
    words_ns = []
    for word in words:
        if word not in sw:
            words_ns.append(word)

    return words, words_ns

def get_highlights(bag_of_words, word, phrase_before, phrase_after):
    # find indexes for instances of search term
    indexes = []
    for i in range(len(bag_of_words)):
        if bag_of_words[i] == word:
            indexes.append(i)
    hlts = []
    for index in indexes:
        hlt = []
        for i in range(index-phrase_before, index+phrase_after):
            if i<len(bag_of_words): #prevent index out of bounds
                curWord = bag_of_words[i]
                hlt.append(curWord)
        hlts.append(hlt)
    return hlts

def get_frequencies(highlights):
    # main_dict = {}
    freqs = []
    for hlt in highlights:
        dict = {}
        for word in hlt:
            if word not in dict.keys():
                dict[word] = 0
            # if word not in main_dict.keys():
                # main_dict[word] = 0
            dict[word] += 1
            # main_dict[word] += 1
        freqs.append(dict)
    # freqs.append(main_dict)
    return freqs


# from my research key words including: `information, may, use, share, including, and collect`
# indicate valuable information in the privacy policy (i.e. types of data the investigator could collect)
def get_score(f):
    high_value_key_words = ['information', 'including', 'collect']
    low_value_key_words = ['may', 'use', 'share']

    score = 0
    for word in f.keys():
        if word in low_value_key_words:
            score += 1
        if word in high_value_key_words:
            score += 2
    return score

def print_results(hlts, f_arr, search_term, num_highlights):
    # print("\nWord frequencies for each highlight")
    # print("NOTE: highlights does NOT pull from the original text (i.e. does NOT contain stopwords)")
    print("searching for *" + search_term + "*")

    id = 1
    results = {}
    for hlt, dict in zip(hlts, f_arr):
        cur_hlt = " ".join(hlt)
        cur_freq = sorted(dict.items(), key=lambda kv: (kv[1], kv[0]), reverse=True)
        cur_score = get_score(dict)
        # cur_r = Highlight(id, cur_hlt, cur_freq, cur_score)
        cur_r = Highlight(id, cur_hlt, cur_score)
        results[id] = cur_r
        id += 1

    results_s = sorted(results.items(), key=lambda kv: (kv[1].rel_score, kv[0]), reverse=True)
    results_s = results_s[:num_highlights]
    for r in results_s:
        # print(str(r[1].rel_score) + " " + r[1].txt)
        data = json.dumps(r, default=lambda o: o.__dict__, sort_keys=True, indent=4)
        print(data)

def lambda_handler(event, context): 
    # current categories:
    #   location --- location, gps
    #   video ------ video, photo
    #   witnesses -- friends, others, follow, subscribe
    #   audio ------ phone, calls
    #   messages --- mail, email, messages, text
    #   financial -- financial, money, credit, deposit, cash,
    #   personal --- email, name, address
    search_term = "location"
    phrase_before = 30
    phrase_after = 30
    num_highlights = 3

    # NOTE: for more information regarding grouping see https://calpoly-dxhub.slack.com/archives/CJJTFJUS3/p1561567208000900
    companies = [["Apple", 'https://www.apple.com/legal/privacy/en-ww/'],
                ['Yahoo', 'https://policies.yahoo.com/xa/en/yahoo/privacy/index.htm'],
                ["Google", "https://policies.google.com/privacy?hl=en-US"],
                ['Twitter', 'https://twitter.com/en/privacy'],
                ["Microsoft", "https://privacy.microsoft.com/en-US/privacystatement"],
                ["Facebook", "https://www.facebook.com/about/privacy/"],

                ["Verizon", "https://www.verizon.com/about/privacy/privacy-policy-summary"],
                ["Comcast", 'https://www.xfinity.com/corporate/customers/policies/customerprivacy'],
                ["AT&T", 'https://about.att.com/sites/privacy_policy'],

                ["Uber", "https://www.uber.com/legal/privacy/"],
                ["Snapchat", "https://www.snap.com/en-US/privacy/privacy-policy/"],
                ["Instagram", "https://help.instagram.com/519522125107875?helpref=page_content"],
                ["Wells Fargo - Individual", 'https://www.wellsfargo.com/privacy-security/privacy/individuals/'],
                ["Wells Fargo - Online", 'https://www.wellsfargo.com/privacy-security/privacy/online/'],
                ["Ancestry", 'https://www.ancestry.com/cs/legal/privacystatement'],
                ['Netflix', 'https://help.netflix.com/legal/privacy'],
                ['Telegram', 'https://telegram.org/privacy']
    ]

    for co in companies:
        print("\n" + co[0])

        bag_of_words, bag_of_words_ns = get_bag_of_words(co[1]) #captures a version of the text with AND without stopwords
        # f = open("./output/practice2/" + co[0], "w")
        # f.write(" ".join(bag_of_words))
        # f.close()

        highlights = get_highlights(bag_of_words, search_term, phrase_before, phrase_after)
        highlights_ns = get_highlights(bag_of_words_ns, search_term, phrase_before, phrase_after)
        frequencies = get_frequencies(highlights_ns)
        print_results(highlights, frequencies, search_term, num_highlights)
