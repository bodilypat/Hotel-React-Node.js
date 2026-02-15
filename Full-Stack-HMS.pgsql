Full-stack-Hotel-Management-System/
├── backend/   (Node.js + Express.js)                           
│   │      
│   ├── src/    
│   │   ├── config/                                        
│   │   │  	├── db.js
│   │   │  	└── env.js
│   │   │ 
│   │   ├── controllers/  
│   │   │	├── auth.controller.js
│   │   │	├── user.controller.js   
│   │   │	├── room.controller.js   
│   │   │   ├── booking.controller.js
│   │   │   ├── payment.controller.js
│   │   │   └── report.Controller.js
│   │   │  
│   │   ├── routes/  
│   │   │	├── auth.routes.js
│   │   │	├── user.routes.js   
│   │   │	├── room.routes.js  
│   │   │   ├── booking.routes.js
│   │   │   ├── payment.routes.js
│   │   │   └── report.routes.js
│   │   │ 
│   │   ├── services/  
│   │   │	├── auth.service.js
│   │   │	├── user.service.js   
│   │   │	├── room.service.js  
│   │   │   ├── booking.service.js
│   │   │   ├── payment.service.js
│   │   │   └── report.service.js
│   │   │   
│   │   ├── models/  
│   │   │	├── auth.model.js
│   │   │	├── user.model.js   
│   │   │	├── room.model.js
│   │   │   ├── booking.model.js
│   │   │   └── payment.model.js
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
│   
├── frontend (React)    
│   ├── src/  
│   │   ├── components
│   │   │   ├── layout/
│   │   │	│   ├── Navbar.jsx                   
│   │   │	│   ├── Sidebar.jsx          
│   │   │   │   └── Footer.jsx
│   │   │   ├── dashboard/                   
│   │   │	│   ├── StatCard.js        
│   │   │   │   └── RevenueChart.jsx
│   │   │   ├── rooms/
│   │   │	│   ├── RoomCard.jsx                
│   │   │	│   ├── RoomForm.jsx      
│   │   │   │   └── RoomTable.jsx
│   │   │   ├── bookings/          
│   │   │	│   ├── BookingForm.jsx          
│   │   │	│   ├── BookingTable.jsx      
│   │   │	│   ├── BookingCalender.jsx
│   │   │   │   └── BookingDetailsModal.jsx
│   │   │   ├── customers/              
│   │   │	│   ├── CustomerForm.jsx      
│   │   │	│   ├── CustomerTable.jsx  
│   │   │	│   ├── CustomerDetailsModal.jsx      
│   │   │   │   └── CustomerSearch.jsx
│   │   │   ├── billing/              
│   │   │	│   ├── BillingForm.jsx      
│   │   │	│   ├── BillingTable.jsx  
│   │   │	│   ├── PaymentModal.jsx      
│   │   │   │   └── InvoiceModal.jsx
│   │   │ 	└── reports/                        
│   │   │	    ├── StatCard.jsx   
│   │   │	    ├── RevenueChart.jsx           
│   │   │	    ├── OccupancyChart.jsx            
│   │   │       └── BookingChart.jsx          
│   │   │     
│   │   ├── pages/                                 
│   │   │   ├── auth/
│   │   │	│   ├── Login.jsx
│   │   │	│   ├── Register.jsx
│   │   │   │   └── ResetPassword.jsx
│   │   │   ├── dashboard/  
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── rooms/  
│   │   │   │   └── Rooms.jsx
│   │   │   ├── booking/  
│   │   │   │   └── Booking.jsx
│   │   │   ├── customers/  
│   │   │   │   └── Customer.jsx
│   │   │   ├── billing/  
│   │   │   │   └── Billing.jsx
│   │   │   └── reports/
│   │   │       └── Reports.jsx
│   │   │                             
│   │   ├── services/                               # API service layer (Axios, Fetch)
│   │   │   ├── api.js                                         
│   │   │   ├── roomService.js 
│   │   │   ├── bookingService.js
│   │   │   ├── customerService.js
│   │   │   ├── billingService.js
│   │   │   └── reportService.js                  
│   │   ├── context/                                
│   │   │   └── AuthContent.js 
│   │   │ 
│   │   ├── hooks/                                  # Custom React hooks
│   │   │   └── userAuth.js 
│   │   │ 
│   │   ├── styles/                                 # Global and module-based styles
│   │   │   ├── main.css
│   │   │   └── dashboard.css 
│   │   │ 
│   │   ├── utils/                                  # Utility functions and constants
│   │   │   ├── validators.js
│   │   │   └── contants.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json   
│
└── README.md
