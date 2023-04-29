import Head from 'next/head';
import { ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Sidebar from "../components/Sidebar"
import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Weather Traffic App</title>
      </Head>
      <div className="container-fluid navdiv">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Your Logo Here</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Link href="/" className="p-3">Home</Link>
              <Link href="/about" className="p-3">About</Link>
              <Link href="/contact" className="p-3">Contact</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <main className="container p-3 mt-3">
        <div className="row">
        <h1>Welcome User!</h1>
        </div>
        <div className="row mt-3">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            {children}
          </div>
        </div>
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </>
  );
}
