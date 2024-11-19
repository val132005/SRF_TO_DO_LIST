
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLogged from './pages/HomeLogged/Component/HomeLogged.js';
import HomeNonLogged from './pages/HomeNonLogged/Component/HomeNonLogged.js';
import Login from './pages/login/Component/Login.js';
import { ApolloProvider } from '@apollo/client';
import client from './config/apolloClient';
import CreateNewItem from './pages/CreateNewItem/Component/CreateNewItem.js';
import EditItem from './pages/EditItem/Component/EditItem.js';
import TaskTable from "./pages/TaskTable/Component/TaskTable.js";
import PhotoGalleryList from './pages/PhotoGallery/Component/PhotoGalleryList.js'
import CreateNewPhoto from './pages/CreateNewPhoto/Component/CreateNewPhoto.js'
import EditPhoto from './pages/EditPhoto/Component/EditPhoto.js'
import CreateNewUser from './pages/CreateNewUser/Component/CreateNewUser.js'




const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/homeLogged/photogallery" element={<PhotoGalleryList />} />
          <Route path="/homeLogged/todolist" element={<TaskTable />} />
          <Route path="/homeLogged/todolist/edititem/:id" element={<EditItem />} />
          <Route path="/homeLogged/todolist/createnewitem" element={<CreateNewItem />} />
          <Route path="/homeLogged/photogallery/createphoto" element={<CreateNewPhoto />} />
          <Route path="/homeLogged/photogallery/editphoto/:id" element={<EditPhoto />} />
          <Route path="/login/register" element={<CreateNewUser />} />




          <Route path="/" element={<HomeNonLogged />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homeLogged" element={<HomeLogged />} />


        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;

