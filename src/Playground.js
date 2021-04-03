import React from "react";
import {
  BubbleLarge,
  BubbleLarge2,
  BubbleMedium,
  BubbleMedium2,
  BubbleSmall
} from "./components/search/bubbles";
import BreadCrumbs from "./components/nav/breadcrumbs";
// import SearchWarrant from "./components/warrant_card/searchWarrant";
import WarrantUploader from "./components/warrant_uploader/warrantUploader";
import GreyButton from "./components/greyButton";
import VerifyButton from "./components/typesOfData/verifyButton";
import Scraper from "./components/typesOfData/scraper";
import Tip from "./components/tips/tip";
import TipUploader from "./components/tipUploader/tipUploader";
import SearchWarrantModerator from "./components/warrant_card/searchWarrantModerator";
import TestForm from "./components/warrant_uploader/TestForm";

//icon array example for large bubble
const icons = [
  [
    "https://devinepartners.com/wp-content/uploads/2015/11/snapchat-icon.jpg",
    function() {
      console.log("snapchat");
    }
  ],
  [
    "https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/ce/17/7c/ce177c6f-4074-d1a8-3be5-04f9c0825e02/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-1.png/246x0w.jpg",
    function() {
      console.log("WellsFargo");
    }
  ]
];

//bread crumbs object example
const wellsFargoObj = {
  dataType: {
    name: "Video Footage",
    link: "reactjs.org",
    icon:
      "https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/phone-icon-18-256.png"
  },
  company: { name: "Wells Fargo", link: "google.com", relevancyScore: "90" },
  numLayers: 3
};

//Privacy Policy scraber object example
const privacyPolicyObj = {
  query: "uber location",
  privacyPolicy: "https://privacy.uber.com/policy/",
  timeStamp: 1564087266648,
  category: "location",
  excerptContent:
    "collection of rider location information at any time through the privacy settings in the uber app or via the settings on your mobile device if you disable the device location services on your device your use of the uber app will be affected for example you will need to anually enter your pickup or dropoff locations in addition to location",
  company: "Uber"
};

/**
 * Playground is a React Component
 * It is a container for dropping in other components
 *
 * To view this page navigate to `App.js` and uncomment `return <Playground />`
 */
function Playground() {
  return (
    <div>
      <BubbleLarge
        title={"Tittle Here"}
        category_icon="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/phone-icon-18-256.png"
        companies={icons}
        onClick={function() {
          console.log("button1");
        }}
      />
      <BubbleLarge2
        title={"Tittle Here"}
        onClick={function() {
          console.log("button2");
        }}
      />
      <BubbleMedium
        title={"Witnesses"}
        category_icon="https://www.materialui.co/materialIcons/social/person_outline_white_192x192.png"
        onClick={function() {
          console.log("button3");
        }}
      />
      <BubbleMedium2
        title={"Tittle Here"}
        onClick={function() {
          console.log("button4");
        }}
      />
      <BubbleSmall
        title={"Audio"}
        onClick={function() {
          console.log("button5");
        }}
      />

      <BreadCrumbs data={wellsFargoObj} />

      {/* OUTDATED
      
      <SearchWarrant
        title="tittle"
        state="California"
        seal="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Seal_of_California.svg/250px-Seal_of_California.svg.png"
        crimeList={[
          "Civil Action to Restrain Harassment of a Victim or Witness Coercion",
          "Sexual Assault",
          "Abuse"
        ]}
        relavance="70"
        date="7/10/2019"
        ranking={10}
        isTemplate={true}
        downloadURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAJFBMVEX///+Ekajo6u/R1d6apbiTnrKLl63ByNOqs8P3+Pq5wc6yusg9sVDpAAAAPUlEQVQImT2MSQ7AIBDDcGaBlv//twiY5mRFTpribTcOugj0v50lGKPwCaxYmYv73loyJuxPxbohjm+O6wMiugC8tY2nBQAAAABJRU5ErkJggg=="
        content="CERTIFIED FOR DEFERRED NOTICE IN THE SUPERIOR COURT OF THE STATE OF CALIFORNIA, COUNTY OF SAN DIEGO S E A R C H W A R R A N T No. __________________________ The People of the State of California, to any peace officer in the County of San Diego: Proof, by affidavit, having been this day made before me by NAME , a peace officer employed by the AGENCY, that there is substantial probable cause pursuant to Penal Code section 1524 for the issuance of the search warrant, as set forth in the affidavit attached hereto and made a part hereof as is fully set forth herein, you are, therefore, commanded to make search at any time of the day, good cause being shown therefore; The court finds that that the information to be obtained by such search is relevant to an ongoing criminal investigation being conducted by the AGENCY of an unidentified suspect in connection with possible violations of California law including, but not limited to: Vehicle Code section 10851 and Penal Code section 470(d), felonies. LOCATION TO BE SEARCHED A. The premises and all parts therein, including all record storage areas and records therein assigned to or part of the business known as: Yahoo! Inc. 701 First Avenue Sunnyvale, CA 94089 Attention: Custodian of Records //// //// ITEMS TO BE SEIZED B. Yahoo! Inc. For the following property and tending to show violation of California Penal Code section 532 (A) Theft by False Pretense, because of specific circumstances of the investigation without specifying time periods, to wit: 1. Any and all records regarding the identification of a user with the following email address: email@yahoo.com a. To include name and address, personal information, subscriber birth date, phone numbers, aliases, date account created, account status, alternate e-mail address, locations, location history, registration from IP, date ID registered, and log-in IP addresses associated with session times and dates. ORDER TO DEFER NOTIFICATION TO COMMUNICATION SERVICE SUBSCRIBER The Court finds there is substantial probable cause to believe notification to the communication service subscriber(s) whose activities are recorded in the records described above would impede or destroy this investigation. Accordingly, the court orders that the request of the AGENCY is granted and that notification to the communication service subscriber(s) is delayed pending further order of this court for a period of ninety (90) days. ORDER TO CERTIFY RECORDS AS AUTHENTIC The electronic communication service provider is further ordered to verify the authenticity of electronic information that it produces by providing an affidavit certifying that the records are true and correct. Affiant shall bring the return report forthwith before me at the Superior Court of the State of California for the County of San Diego, or to any other court in which the offense in respect to which the property or things is triable, pursuant to sections 1536 and 1546 et. seq. of the California Penal Code. Affiant shall thereafter retain in your custody the data or information subject to further order of the issuing magistrate or a court with jurisdiction over the matter, and shall dispose of said data only upon order of the issuing magistrate or a court with jurisdiction over the matter. As required by Penal Code section 1546.1(d)(2), any information obtained through the execution of this warrant that is unrelated to the objective of the warrant shall be sealed and shall not be subject to further review, use, or disclosure absent an order from the Court. Given under my hand and dated this 23rd day of August, 2018. _______________________________ Judge of the Superior Court County of San Diego IN THE SUPERIOR COURT OF THE STATE OF CALIFORNIA, COUNTY OF SAN DIEGO STATE OF CALIFORNIA, ) AFFIDAVIT FOR SEARCH WARRANT (ss. COUNTY OF SAN DIEGO ) No. _______________________________ I, NAME, do on oath make complaint, say and depose the following on this 23rd day of August, 2018: that I have substantial probable cause to believe and I do believe that I have cause to search: LOCATION TO BE SEARCHED B. The premises and all parts therein, including all record storage areas and records therein assigned to or part of the business known as: Yahoo! Inc. 701 First Avenue Sunnyvale, CA 94089 Attention: Custodian of Records ITEMS TO BE SEIZED A. Yahoo! Inc. For the following property and items tending to show violation of California Penal Code section 532 (A) Theft by False Pretense, because of specific circumstances of the investigation without specifying time periods, to wit: 2. Any and all records regarding the identification of a user with the following email address: email@yahoo.com b. To include name and address, personal information, subscriber birth date, phone numbers, aliases, date account created, account status, alternate e-mail address, locations, location history, registration from IP, date ID registered, and log-in IP addresses associated with session times and dates. AFFIANT’S QUALIFICATIONS I am a peace officer employed by the … PROBABLE CAUSE During the course of my duties, I have learned the following information based upon my discussions with the named witnesses, or by having read the official reports of, or talked with other police officers or employees, who have spoken directly with the named witnesses. All references to dates refer to the current calendar year unless otherwise specified. OPINIONS AND CONCLUSIONS I believe … Based upon my training and experience and discussions with other detectives, I know that specifying a date range for the records is unfeasible when among other things, the data sought is the IP address and identifiers used to initially establish the accounts. While these accounts were certainly used within a specific time frame related to the investigation, there is no practical way to establish a start date for when the account was created. Penal Code section 1546.1(d)(1) states: “The warrant shall describe with particularity the information to be seized by specifying, as appropriate and reasonable, the time periods covered, … provided, however, … the court may determine that it is not appropriate to specify time periods because of the specific circumstances of the investigation, including, but not limited to, the nature of the device to be searched.” Because the IP address and identifiers used to establish the accounts are sought in this case, I am asking the Court to determine that it is not appropriate in this case, to specify time periods. Based on the aforementioned information and investigation, I believe that grounds for the issuance of a search warrant exist as set forth in Penal Code 1524. I, the affiant, hereby pray that a search warrant be issued for the seizure of said property, or any part thereof, from said premise, good cause being shown therefore, and that the same be brought before this magistrate or retained subject to the order of this Court. DEFERRED NOTICE REQUEST Under the California Electronic Communications Privacy Act, Penal Code section 1546 et. seq., the target of an investigation must be notified by law enforcement contemporaneous with the service of a Search Warrant for electronic communication information. Notice with reasonable specificity of the nature of the investigation and copy of the warrant or written statement setting forth facts giving rise to an exigency must be provided contemporaneously with the execution of a warrant, or, in the case of exigent circumstances within three days after obtaining the information. Penal Code section 1546.2(c) states that “[i]f there is no identified target of a warrant…at the time of its issuance, the government entity shall submit to the Department of Justice within three days of the execution of the warrant… .” In this case, the identity of the target is yet unknown and notice will be provided to DOJ as required. I therefore request the court order the subject financial institution to defer notification pending further Court Order. Under the federal Electronic Communications Privacy Act, 18 U.S.C. 2701 et. seq. and the California Public Utilities Commission an electronic communication service provider must notify the subscriber that law enforcement has requested the provider’s records for the subscribers account and/or device. Law enforcement may request that said notification be delayed for a period of ninety (90) days upon a showing that notifying the subscriber would cause an adverse result in the investigation. 18 U.S.C. 2705 defines an adverse result as: endangering the life or physical safety of an individual; flight from prosecution; destruction of or tampering with evidence; intimidation of potential witnesses; or otherwise seriously jeopardizing an investigation or unduly delaying a trial. YOUR CASE SPECIFIC REASON FOR DELAYED NOTICE. Based on these reasons, I am requesting that notification to the subscribers by Yahoo be delayed for an additional ninety (90) days. As required by Penal Code section 1546.1(d)(2); those items that are within the scope of this warrant will be copied and retained by investigative agents. Investigating agents will then seal any information obtained that is unrelated to the objective of the warrant and will not further review the information absent an order from the Court. And at the conclusion of any legal proceedings, in which the items seized are no longer of evidentiary value, that they may be returned to their rightful owner(s) or if none is located, that they might be disposed of according to law. CUSTODIAN OF RECORDS AFFIDAVIT The California ECPA, pursuant to Penal Code section 1546.1(d)(3) requires that when a search warrant is directed to an electronic communication service provider that the warrant be accompanied by an order directed to the service provider to require the provider to verify the authenticity of electronic information that it produces by providing an affidavit that complies with the requirements set forth in Section 1561 of the Evidence Code. Yahoo is an electronic communication information service provider within the meaning of Penal Code section 1546(e). Therefore, based on my training and experience and the above facts, I believe that I have substantial cause to believe the above described property, or a portion thereof, will be at the above described premises when the warrant is served. Based on the aforementioned information and investigation, I believe that grounds for the issuance of a search warrant exist as set forth in Penal Code 1524. I, the affiant, hereby pray that a search warrant be issued for the seizure of said property, or any part thereof, from said premise, good cause being shown therefore, and that the same be brought before this magistrate or retained subject to the order of this Court. This affidavit has been reviewed for legal sufficiency by Prosecutor. Given under my hand and dated this 23rd day of August, 2018. ________________________________ Your Name Subscribed and sworn to before me This 23rd day of August, 2018, at _______________ p.m. __________________________ Judge of the Superior Court"
      /> */}
      <GreyButton
        buttonText="Upload Search Warrant"
        destination={WarrantUploader}
      />
      <VerifyButton
        profileImg="https://psmatraining.com/wp-content/uploads/2018/02/Police-Officer-1024x662.jpg"
        checkmarkImg="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/checkmark-24-512.png"
        startRadius={30}
        endRadius={40}
        startMargin={20}
        endMargin={15}
      />
      <SearchWarrantModerator
        title="tittle"
        state="CA"
        crimeList={[
          "Civil Action to Restrain Harassment of a Victim or Witness Coercion",
          "Sexual Assault",
          "Abuse"
        ]}
        relavance="70"
        date="7/10/2019"
        ranking={10}
        isTemplate={true}
        downloadURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAJFBMVEX///+Ekajo6u/R1d6apbiTnrKLl63ByNOqs8P3+Pq5wc6yusg9sVDpAAAAPUlEQVQImT2MSQ7AIBDDcGaBlv//twiY5mRFTpribTcOugj0v50lGKPwCaxYmYv73loyJuxPxbohjm+O6wMiugC8tY2nBQAAAABJRU5ErkJggg=="
        contentHighlight="CERTIFIED FOR DEFERRED **NOTICE** IN THE SUPERIOR **COURT** OF THE STATE OF CALIFORNIA, COUNTY OF SAN DIEGO S E A R C H W A R R A N T No. _______perty, or any part thereof, from said premise, good cause being shown therefore, and that the same be brought before this magistra the g"
      />
      <Scraper data={privacyPolicyObj} />
      <Tip
        votes={5}
        title={"Requesting Digital Evidence during an Emergency"}
        content={
          "All requests require details on specific information sought out. Common requests include: complaint logs and ride reciepts. Standard requests have a processing time while exceptions fro emergency and exigent requiests exists when the rider, drived-partner or third party has been physically endangard"
        }
        user={"Tanner Larson"}
        location={"San Luis Opisbo"}
        source={"Bitcoin and stuff"}
      />
      <GreyButton buttonText="Add Warrant Tip" destination={TipUploader} />
      {/* <TestForm /> */}
    </div>
  );
}

export default Playground;
