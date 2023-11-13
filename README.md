# Vlogmi-MVP

clone the repository.


checkout to develop branch using the command - git checkout develop

add .env file and copy paste the env data thats received via email

run ' npm i '

run ' npm start ' to start the server

routes:


get instagram data by id

.get(`http://localhost:2020/api/v1/instagram?id=${id}`) - id is the id of data which you want


get instagram data by profile hanlde

.get(`http://localhost:2020/api/v1/instagram/handle?handle=${handle}`) - id is the id of data which you want

get all instagram dats ids

.get(http://localhost:2020/api/v1/instagram/all)


create instagram data

.post(http://localhost:2020/api/v1/instagram,  { name: "11", data: {name:"test} }) - name for the particular data & the metadata for that data
