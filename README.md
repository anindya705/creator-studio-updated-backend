# Vlogmi-MVP

# sample route - http://localhost:2020/api/v1/user/details

clone the repository.

add .env file and copy paste the env data thats received vial email

run ' npm i '

run ' npm start ' to run the repository

routes:


get instagram data by id

.get(`http://localhost:2020/api/v1/instagram?id=${id}`) - id is the id of data which you want

get all instagram dats ids

.get(http://localhost:2020/api/v1/instagram/all)


create instagram data

.post(http://localhost:2020/api/v1/instagram,  { name: "11", data: {name:"test} }) - name for the particular data & the metadata for that data