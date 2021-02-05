const App = (() => {
    const profileEl = document.querySelector('.profile');
    const pictureEl = document.querySelector('.profile-picture');
    const locationEl = document.querySelector('.location');
    const profileNameEl = document.querySelector('.profile-name');
    const profileBioEl = document.querySelector('.profile-bio');
    const followersEl = document.querySelector('.followers'); 
    const followingEl = document.querySelector('.following'); 
    const publicReposEl = document.querySelector('.public-repos'); 
    const repositoriesEl = document.querySelector('.repositories');
    const formEl = document.querySelector('.search-form'); 
    const searchEl = document.querySelector('#search');
    const errorMessageEl = document.querySelector('.error-message');

    const setValue = (elem, value) => elem.innerHTML = value;

    const errorMessage = () => {
        errorMessageEl.classList.add('show');
        setTimeout(() => {
            errorMessageEl.classList.remove('show');
        }, 2500);
    };

    const getProfile = async (username) => {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const profile = await response.json();   
        if(response.ok) {
            profileEl.classList.add('show');
            return profile;
        }
        else errorMessage();
    };

    const getRepos = async (username) => {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=created?order=desc?per_page=5`);
        const user_repos = await response.json();
        return user_repos;
    }; 

    const renderRepos = (repos) => {
        let markup = '';
        for(let i = 0; i < 5; i++) {
            markup += `
                <li class="repository">
                    <a href="${repos[i].html_url}" target="_blank">${repos[i].name}</a>
                </li> 
            `
        }
        repositoriesEl.innerHTML = markup;
    }; 

    const renderProfile = (profile) => {
        pictureEl.src = profile.avatar_url;
        setValue(locationEl, profile.location);
        setValue(profileNameEl, profile.name);
        setValue(profileBioEl, profile.bio);
        setValue(followersEl, profile.followers);
        setValue(followingEl, profile.following);
        setValue(publicReposEl, profile.public_repos);
    };

    const listeners = () => {
        formEl.addEventListener('submit', event => {
            event.preventDefault();
            if(searchEl.value.trim()) {
                const username = searchEl.value;
    
                getProfile(username)
                    .then(profile => renderProfile(profile));
    
                getRepos(username)
                    .then(repos => renderRepos(repos));
    
                searchEl.value = '';
            };
        });
    };

    return {
        listeners
    };

})();   

App.listeners();