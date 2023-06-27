    // Retrieve necessary elements from the DOM
    document.addEventListener('DOMContentLoaded', () =>{
    const form = document.getElementById("github-form");
    const input = document.getElementById("search");
    const githubContainer = document.getElementById("github-container");

    // Add event listener to the search form
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const query = input.value;
      if (query !== "") {
        searchUsers(query);
      }
    });

    // Function to search for users
    function searchUsers(query) {
      const url = `https://api.github.com/search/users?q=${query}`;

      // Make a GET request to the GitHub API
      fetch(url, {
        headers: {
          "Accept": "application/vnd.github.v3+json"
        }
      })
      .then(response => response.json())
      .then(data => {
        displayUsers(data.items); // Display the search results
      })
      .catch(error => {
        console.log("An error occurred:", error);
      });
    }

    // Function to display user search results
    function displayUsers(users) {
      githubContainer.innerHTML = "";

      if (users.length > 0) {
        users.forEach(user => {
          const userItem = createUserItem(user); // Create a DOM element for each user
          githubContainer.appendChild(userItem); // Add the user element to the search results container
        });
      } else {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No results found.";
        githubContainer.appendChild(noResultsMessage);
      }
    }

    // Function to create a DOM element for each user
    function createUserItem(user) {
      const userItem = document.createElement("div");
      userItem.classList.add("user-item");

      const avatar = document.createElement("img");
      avatar.src = user.avatar_url;
      avatar.alt = "User Avatar";

      const username = document.createElement("p");
      username.textContent = user.login;

      const profileLink = document.createElement("a");
      profileLink.href = user.html_url;
      profileLink.textContent = "View Profile";

      userItem.appendChild(avatar);
      userItem.appendChild(username);
      userItem.appendChild(profileLink);

      // Add event listener to the user element to fetch and display user repositories
      userItem.addEventListener("click", function() {
        searchUserRepos(user.login);
      });

      return userItem;
    }

    // Function to fetch user repositories
    function searchUserRepos(username) {
      let url = `https://api.github.com/users/${username}/repos`;

      // Make a GET request to the GitHub API
      fetch(url, {
        headers: {
          "Accept": "application/vnd.github.v3+json"
        }
      })
      .then(response => response.json())
      .then(data => {
        displayUserRepos(data); // Display the user repositories
      })
      .catch(error => {
        console.log("An error occurred:", error);
      });
    }

    // Function to display user repositories
    function displayUserRepos(repos) {
      githubContainer.innerHTML = "";

      if (repos.length > 0) {
        repos.forEach(repo => {
          const repoItem = createRepoItem(repo); // Create a DOM element for each repository
          githubContainer.appendChild(repoItem); // Add the repository element to the search results container
        });
      } else {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No repositories found.";
        githubContainer.appendChild(noResultsMessage);
      }
    }

    // Function to create a DOM element for each repository
    function createRepoItem(repo) {
      const repoItem = document.createElement("div");
      repoItem.classList.add("repo-item");

      const repoName = document.createElement("p");
      repoName.textContent = repo.name;

      const repoDescription = document.createElement("p");
      repoDescription.textContent = repo.description;

      repoItem.appendChild(repoName);
      repoItem.appendChild(repoDescription);

      return repoItem;
    }
})
