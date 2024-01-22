import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './route/route';
import SettingContext from './context/SettingContext';

import '../src/assets/index.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'bootstrap-icons/font/bootstrap-icons.css';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import UserContext from './context/front-end/UserContext';
import ThemeModeContext from './context/ThemeModeContext';
import 'swiper/css/bundle';
import PageLoadingContext from './context/PageLoadingContext';
import VisitorMessageContext from './context/front-end/VisitorMessageContext';
import { HelmetProvider } from 'react-helmet-async';

 //Sweet alert message
 window.Swal = Swal;
 
 const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  grow:"row",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

window.toast = toast;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <PageLoadingContext>
        <UserContext>
          <ThemeModeContext>
            <SettingContext>
              <VisitorMessageContext>
                <RouterProvider router={router}/>
              </VisitorMessageContext>
            </SettingContext>
          </ThemeModeContext>
        </UserContext>
      </PageLoadingContext>
    </HelmetProvider>
  </React.StrictMode>,
)
