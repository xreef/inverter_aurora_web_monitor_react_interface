export const addToHomeScreen = (deferredPrompt) => {
    // let {deferredPrompt} = this.state.serviceWorker;
    deferredPrompt.prompt();  // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then(function(choiceResult){
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted to install app');

            return {
                exitStatus: true,
                variant: 'success',
                message: 'User accepted to install app'
            };
        } else {
            console.log('User not accepted to install app');

            return {
                exitStatus: false,
                variant: 'warning',
                message: 'User not accepted to install app'
            };
        }
        // deferredPrompt = null;
    });
};
