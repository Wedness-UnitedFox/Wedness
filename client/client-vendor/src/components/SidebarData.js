import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as VsIcons from "react-icons/vsc";
import * as ImIcons from "react-icons/im";

export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Add Vendor',
    path: '/add',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Chat',
    path: '/chat',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: "Approval",
    path: '/approve',
    icon: <VsIcons.VscChecklist />,
    cName: 'nav-text'
  },
];