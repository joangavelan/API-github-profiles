const App = (() => {
    let query = 'joangavelan';

    const getProfile = async (query) => {
        const response = await fetch(`https://api.github.com/users/${query}`);
        const profile = await response.json();   
        console.log(profile)
    }

    getProfile(query);
})();