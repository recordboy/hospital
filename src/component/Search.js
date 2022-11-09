import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './Search.scss';

const recommendList = [
  'B형간염',
  '비만',
  '관절염',
  '우울증',
  '식도염'
]

const Search = () => {

  const [set, setOn] = useState(false);
  // const [data, setData] = useState([{ sickNm: '검색결과 없음' }]);
  const [data, setData] = useState([{ sickNm: '' }]);
  const [searchStr, setSearchStr] = useState('');

  const changeInputState = (e) => {
    if (e.target.className === 'searchBar') {
      setOn(true)
    } else {
      setOn(false)
    }
  }

  const changeInputStr = (e) => {


    // console.log(e.target.value)
    // // 검색 텍스트 셋팅
    setSearchStr(e.target.value);

    if (e.target.value.length) {
      runServer(e.target.value);
    } else {
      // setData([{ sickNm: '검색결과 없음' }]);
      setData([{ sickNm: '' }]);
    }

  }

  const enterInput = (e) => {
    if (e.keyCode === 13) {
      // runServer(e.target.value);
    }
  }


  // 통신
  const runServer = (parms) => {
    fetch(`http://localhost:4000/sick?q=${parms}`, {
      method: 'GET',
      header: { 'Content-Type': `application/json` },
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        setData(result);

        // 검색결과 있을때
        if (result.length) {

          console.log(result)
          setData(result);

          // 검색결과 없을때
        } else {
          setData([{ sickNm: '' }]);
        }
      });

  }

  return (<div className="mainWrap" onClick={changeInputState}>
    <div className="mainCenter" >
      <h2 className="title">국내 모든 임상시험 검색하고 <br></br>온라인으로 참여하기</h2>
      <div className="searchWrap">
        <div className={set ? "searchInner on" : "searchInner"}>
          <input className="searchBar" placeholder="질환명을 입력해 주세요." onChange={changeInputStr} onKeyDown={enterInput} />
          <FontAwesomeIcon icon={faSearch} className="search" />
        </div>
      </div>
      <div className="listWrap">

        {/* 최근검색어
          <div className="recent">

          </div> */}

        {/* 검색어 */}
        <div className={searchStr.length ? 'searchTxt on' : 'searchTxt'}>
          <FontAwesomeIcon icon={faSearch} className="search" />
          <span className="text">{searchStr}</span>
        </div>

        {/* 추천검색어 */}
        <div className="recommend">
          <div className="subTit">추천 검색어</div>

          <div className={data[0].sickNm ? 'searchData on' : 'searchData'}>
            {data.map((item, idx) => {
              // 검색결과 5개까지만 노출
              if (idx < 5) {
                return (<div className="item" key={idx}>
                  {item.sickNm}
                </div>);
              }
            })}
          </div>

          <div className={!data[0].sickNm ? 'dummyData on' : 'dummyData'}>
            {recommendList.map((item, idx) => {
              return (<div className="item" key={idx}>
                {item}
              </div>);
            })}
          </div>
        </div>
      </div>
    </div>
  </div>)
}

export default Search;