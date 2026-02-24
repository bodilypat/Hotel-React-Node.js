Full-stack-Hotel-Management-System/
├── backend/   (Node.js + Express.js)                           
│   │      
│   ├── src/    
│   │   ├── config/                                        
│   │   │  	├── db.js
│   │   │  	└── env.js
│   │   │ 
│   │   ├── models/  
│   │   │	├── User.js
│   │   │	├── Room.js   
│   │   │	├── Guest.js
│   │   │   ├── Reservation.js
│   │   │   └── Payment.js
│   │   ├── controllers/  
│   │   │	├── user.controller.js
│   │   │	├── room.controller.js   
│   │   │	├── guest.controller.js   
│   │   │   ├── reservation.controller.js
│   │   │   ├── payment.controller.js
│   │   │   └── report.Controller.js
│   │   ├── services/  
│   │   │	├── user.service.js
│   │   │	├── room.service.js   
│   │   │	├── guest.service.js  
│   │   │   ├── reservation.service.js
│   │   │   ├── payment.service.js
│   │   │   └── report.service.js
│   │   │  
│   │   ├── routes/                                   # API routes
│   │   │	├── authRoutes.js
│   │   │	├── userRoutes.js   
│   │   │	├── roomRoutes.js  
│   │   │   ├── guestRoutes.js
│   │   │   ├── reservationRoutes.js
│   │   │   └── reportRoutes.js
│   │   │ 
│   │   ├── middleware/  
│   │   │	├── auth.middleware.js
│   │   │   └── role.middleware.js
│   │   ├── utils/  
│   │   │	├── generateToken.js
│   │   │	├── hashPassword.js
│   │   │   └── logger.js
│   │   │ 
│   │   ├── validations/                                        
│   │   │  	├── auth.validation.js
│   │   │  	└── booking.validation.js
│   │   │
│   │   ├── app.js                              
│   │   └── package.json  
│   ├── .env
│   └── server.js            
│  
├── frontend (React)  
│   ├── public/  
│   │   ├── index.html
│   │   └── 
│   ├── src/  
│   │   │   
│   │   ├── components
│   │   │   ├── layout/      
│   │   │	│   ├── MainLayout.jsx
│   │   │	│   ├── AuthLayout.jsx             
│   │   │	│   ├── Navbar.jsx
│   │   │	│   ├── Sidebar.jsx        
│   │   │   │   └── Footer.jsx
│   │   │   ├── ui/
│   │   │	│   ├── Button.jsx     
│   │   │	│   ├── Input.jsx
│   │   │	│   ├── Card.jsx
│   │   │	│   ├── Modal.jsx
│   │   │	│   ├── Table.jsx
│   │   │	│   ├── Badge.jsx          
│   │   │   │   └── Loader.jsx
│   │   │ 	└── common/                             
│   │   │	    ├── Loader .jsx       
│   │   │	    ├── 
│   │   │       └── ProtectedRoute.jsx
│   │   │     
│   │   ├── pages/                                 
│   │   │   ├── dashboard/
│   │   │	│   ├── Dashbord.jsx       
│   │   │	│   ├── DashbordCard.jsx
│   │   │	│   ├── Dashbord.css
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── Rooms page/  
│   │   │   ├── Bookins Page/  
│   │   │   ├── Guests Page/  
│   │   │   └── Login.jsx/
│   │   │       └── 
│   │   │                             
│   │   ├── services/                               # API service layer (Axios, Fetch)
│   │   │   ├── api.js                                         
│   │   │   ├── authService.js 
│   │   │   ├── dashboardService.js 
│   │   │   ├── roomService.js
│   │   │   ├── bookingService.js
│   │   │   ├── billingService.js
│   │   │   └── reportService.js                  
│   │   ├── context/                                
│   │   │   └── AuthContext.jsx 
│   │   │ 
│   │   ├── hooks/   
│   │   │   ├── useAuth.js                               
│   │   │   └── userFetch.js 
│   │   │ 
│   │   ├── utils/                                  # Utility functions and constants
│   │   │   ├── validators.js
│   │   │   ├── constants.js
│   │   │   └── helper.js
│   │   ├── styles/                                 # Global and module-based styles
│   │   │   ├── main.css
│   │   │   └── global.css 
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json   
│
└── README.md
