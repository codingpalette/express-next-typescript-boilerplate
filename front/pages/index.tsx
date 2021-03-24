import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import wrapper from '../store';
import {END, Task} from 'redux-saga';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {ReducerType} from "../reducers";
import {LOAD_MY_INFO_REQUEST, User} from '../reducers/userReducer';
import {Store} from "redux";

interface SagaStore extends Store {
  sagaTask?: Task;
}


const IndexPage = () => {
  const { me } = useSelector<ReducerType, User>(state=> state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('me', me)
  }, [me])

  useEffect(() => {
    // dispatch(LOAD_MY_INFO_REQUEST());
  }, [])

  return (
    <>
      <Layout>
        <div>
          Home
          {me && me.email}
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  await context.store.dispatch(LOAD_MY_INFO_REQUEST());

  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask.toPromise();

  return {
    props: {},
  };
})

export default IndexPage;
