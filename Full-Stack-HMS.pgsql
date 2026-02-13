Full-stack-Hotel-Management-System/
├── backend/   (Node.js + Express.js)                           
│   │     
│   ├── controllers/  
│   │	├── authController.js
│   │	├── roomController.js   
│   │   ├── bookController.js
│   │   ├── customerController.js
│   │   ├── billingController.js
│   │   └── reportController.js
│   │   
│   ├── models/  
│   │	├── User.js
│   │	├── Room.js
│   │   ├── Booking.js
│   │   ├── Customer.js
│   │   └── Invoice.js
│   │  
│   ├── routes/  
│   │	├── authRoutes.js
│   │	├── roomRoutes.js  
│   │   ├── bookingRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── billingRoutes.js
│   │   └── reportRoutes.js
│   │ 
│   ├── middleware/  
│   │	├── authMiddleware.js
│   │   └── errorHandler.js
│   │ 
│   ├── config/                                        
│   │  	├── 
│   │  	└── db.js           
│   │
│   ├── server.js                                
│   └── package.json                 
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
