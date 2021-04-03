import React, { useState } from 'react';
import styled from 'styled-components';
import { searchWarrants } from '../api/Warrant';
import Search from '../components/search/search';
import StatusBar from '../components/search/statusBar';
import SearchWarrantsResults from '../containers/SWContainerCS';

const SWDemo = props => {
  const [data, setData] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  // const userGroup = useContext(UserContext);

  const handleSubmit = query => {
    searchWarrants(query).then(result => {
      setData(result);
      setHasSearched(true);
    });
  };

  const RenderResults = () => {
    if (hasSearched) {
      return (
        <div>
          <StatusBar
            numResults={data.hits.found}
            searchTime={data.status.timems}
          />
          <SearchWarrantsResults hits={data.hits.hit} />
        </div>
      );
    }
    return null;
  };

  return (
    <MainContainer>
      {/* <Upload>
        <GreyButton
          buttonText="Upload Search Warrant"
          destination={WarrantUploader}
        />
      </Upload> */}
      <Search handleSubmit={handleSubmit} />
      <RenderResults />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  margin-top: 20px;
`;

export default SWDemo;
