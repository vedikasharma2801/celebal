// src/data/dummy.js
import React from 'react';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard } from 'react-icons/fi';
import { AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { BsKanban, BsBarChart } from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';

export const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'ecommerce',
          icon: <FiShoppingBag />,
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'orders',
          icon: <AiOutlineShoppingCart />,
        },
        {
          name: 'employees',
          icon: <IoMdContacts />,
        },
        {
          name: 'customers',
          icon: <RiContactsLine />,
        },
      ],
    },
    {
      title: 'Apps',
      links: [
        {
          name: 'calendar',
          icon: <AiOutlineShoppingCart />,
        },
        {
          name: 'kanban',
          icon: <BsKanban />,
        },
      ],
    },
    // ... more links
];

export const kanbanGrid = [
    { headerText: 'To Do',
      keyField: 'Open',
      allowToggle: true },
  
    { headerText: 'In Progress',
      keyField: 'InProgress',
      allowToggle: true },
  
    { headerText: 'Testing',
      keyField: 'Testing',
      allowToggle: true,
      isExpanded: false },
  
    { headerText: 'Done',
      keyField: 'Close',
      allowToggle: true },
];

export const kanbanData = [
    // ... Add Kanban tasks here
    {
        'Id': 'Task 1',
        'Title': 'Task - 29001',
        'Status': 'Open',
        'Summary': 'Analyze the new requirements gathered from the customer.',
        'Type': 'Story',
        'Priority': 'Low',
        'Tags': 'Analyze,Customer',
        'Estimate': 3.5,
        'Assignee': 'Nancy Davloio',
        'RankId': 1,
        'Color': '#02897B',
        'ClassName': 'e-story, e-low, e-nancy-davloio'
    },
    // ... more tasks
];

// ... Add data for charts, grids, etc.