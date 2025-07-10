import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './Dashboard/Navbar';
import Hero from './Dashboard/Hero';
import Page2 from './Dashboard/page2';
import Page3 from './Dashboard/page3';
import Page4 from './Dashboard/page4';
import Page5 from './Dashboard/page5';
import Page6 from './Dashboard/page6';
import Page7 from './Dashboard/page7';
import Page8 from './Dashboard/page8';
import Footer from './Dashboard/footer';
import './global.css';


function Dashboard() { 
  return (<>
      <Navbar></Navbar>
      <Hero></Hero>
      <Page2></Page2>
      <Page3></Page3>
      <Page4></Page4>
      <Page5></Page5>
      <Page6></Page6>
      <Page7></Page7>
      <Page8></Page8>
      <Footer></Footer>
    </>
  );
}

export default Dashboard;
