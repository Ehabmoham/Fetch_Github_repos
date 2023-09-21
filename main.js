// Select Main Element
let input = document.querySelector('.header input');
let btn = document.querySelector('.header button');
let reposContainer = document.querySelector('.repos-container');
let noRepos = document.querySelector('.repos-container .no-repos');


btn.addEventListener('click' , function(){
    if(input.value === ''){
        document.querySelector('.failed').style.display =  'block';
    }else{
        fetch(`https://api.github.com/users/${input.value}/repos`)
        .then((result) => {
                document.querySelector('.failed').style.display =  'none';
                reposContainer.innerHTML = '';
                let repos = result.json();
                return repos;

            }).then((repoData)=>{
                for(let i = 0; i < repoData.length; i++){

                    let repo = document.createElement('div');
                    repo.className = 'repo';

                    let repoName = document.createElement('p');
                    repoName.appendChild(document.createTextNode(repoData[i].name));
                    repo.appendChild(repoName);

                    let options = document.createElement('div');
                    options.className = 'options';
                    repo.appendChild(options);

                    let repoStars = document.createElement('span');
                    repoStars.className = 'star';
                    repoStars.appendChild(document.createTextNode(`Stars: ${repoData[i].stargazers_count}`));
                    options.appendChild(repoStars);

                    let visitRepo = document.createElement('a');
                    visitRepo.href = repoData[i].html_url;
                    visitRepo.appendChild(document.createTextNode('visit'));
                    visitRepo.setAttribute('target' , '_blank');
                    options.appendChild(visitRepo);
                    reposContainer.appendChild(repo);
                };
            }).catch((erro)=>{

                console.log(erro)
            })
    };
});


