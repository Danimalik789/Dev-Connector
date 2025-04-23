import React, { useEffect, useState } from "react";

const ProfileGitHub = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const clientId = "Ov23liiVxZqCKhzuH90t";
  const clientSecret = "cabdf33b2dc769a3e6a1c9e7fc0df30f75e44a0c";
  const count = 5;
  const sort = "created: asc";

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
        );
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        console.error("GitHub Api error", err);
      }
    };
    if (username) {
      fetchRepos();
    }
  }, [username]);

  const repoItems = repos.map((repo) => (
    <div key={repo.id} className="card card-body mb-2">
      <div className="row">
        <div className="col-md-6">
          <h4>
            <a
              href={repo.html_url}
              className="text-info"
              target="_blank"
              rel="noopener noreferrer"
            >
              {repo.name}
            </a>
          </h4>
          {repo.description}
        </div>
        <div className="col-md-6">
          <span className="badge badge-info mr-1">
            Stars: {repo.stargazers_count}
          </span>
          <span className="badge badge-secondary mr-1">
            Watchers: {repo.watchers_count}
          </span>
          <span className="badge badge-success">Forks: {repo.forks_count}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <hr />
      <h3 className="mb-4">Latest Github Repos</h3>
      {repoItems.length > 0 ? repoItems : <p>No repositories found.</p>}
    </div>
  );
};

export default ProfileGitHub;
