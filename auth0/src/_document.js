import LoginButton from './components/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';

export default function Document() {
    
    const { isAuthenticated } = useAuth0();

    if (!isAuthenticated) return (
    
    <>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,500&display=swap"
                rel="stylesheet"
            />
        </head>
        
      
        <body>
            <div class="container">
                <LoginButton id="submit-button"/>
            </div>
            
            <script src="script.js"></script>
        </body>
        
    </>
    
  );
}