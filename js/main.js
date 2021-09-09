$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
      let username = e.target.value;
  
      // Make request to Github
      $.ajax({
          url:'https://api.github.com/users/'+username,
      }).done(function(user){
        $.ajax({
          url:'https://api.github.com/users/'+username+'/repos',
          data:{
            client_id:'9d749e6dcd5352b8629b',
            client_secret:'9913f034c4d010bb2957f157930c4ded20b9a636',
            sort: 'created: asc',
            per_page: 5
          }
        }).done(function(repos){
            $.each(repos, function(index, repo){
              $('#repos').append(`
                <div class="card my-2 border">
                  <div class="row center">
                    <div class="col-md-7 ml -3">
                      <strong>${repo.name}</strong>: ${repo.description}
                    </div>
                    <div class="col-md-3">
                      <span class="badge rounded-pill bg-primary">Forks: ${repo.forks_count}</span>
                      <span class="badge rounded-pill bg-success">Watchers: ${repo.watchers_count}</span>
                      <span class="badge rounded-pill bg-info">Stars: ${repo.stargazers_count}</span>
                    </div>
                    <div class="col-md-2">
                      <a href="${repo.html_url}" target="_blank" class="btn btn-info">Repo Page</a>
                    </div>
                  </div>
                </div>
              `);
            });
          });
        $('#profile').html(`
        <div class="card border-primary mb-3" style="max-width: 100rem;">
            <div class="card-header"><h3>${user.name}</h3></div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img class="img-thumbnail avatar" src="${user.avatar_url}">
                            <a target="_blank" class="btn btn-primary btn-block centar" href="${user.html_url}">View Profile</a>
                        </div>
                        <div class="col-md-9">
                                <span class="badge rounded-pill bg-primary">Public Repos: ${user.public_repos}</span>
                                <span class="badge rounded-pill bg-success">Public Gists: ${user.public_gists}</span>
                                <span class="badge rounded-pill bg-danger">Followers: ${user.followers}</span>
                                <span class="badge rounded-pill bg-info">Following: ${user.following}</span>
                            <br><br>
                            <ul class="list-group">
                                <li class="list-group-item">Company: ${user.company}</li>
                                <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                                <li class="list-group-item">Location: ${user.location}</li>
                                <li class="list-group-item">Member Since: ${user.created_at}</li>
                            </ul>
                        </div>
                    </div>
                </div>
        </div>
          <h3 class="page-header">Latest Repos</h3>
            <div id="repos"></div>
          `);
      });
    });
  });