const { getDefaultResultOrder } = require('dns');
const fs = require('fs/promises');
const _ = require('lodash');

const getAnime = async (req, res) => {
  const response = await fs.readFile("anime.json", "utf8");
  const data = JSON.parse(response);
  return data;
};

const getAnimebyId = async (req, res) =>{
    const id = parseInt(req.params.id);
    const data = await getAnime();
    if(data[id]=== undefined){
        res.send('id does not match any Anime on DataBase')
    }
    res.status(200).send(data[id]);
};

const addNewAnime = async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await getAnime(); 
    const newData = { ...data, [id]: req.body };
    const json = JSON.stringify(newData)
    if(data[id]) {
        res.send('id already exists')}
    else {
        fs.writeFile('anime.json', json);
        res.status(201).send("anime created");
    };
    };

const deleteAnimeById = async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await getAnime(); 
    if (data[id] === undefined) {
      res.send("id does not match any Anime on DataBase");
    }else{
        delete data[id];
        const json = JSON.stringify(data);
        fs.writeFile("anime.json", json);
        res.status(200).send(`anime id ${id} deleted from database`)
    }
}

const updateAnime = async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await getAnime(); 
   const merged = _.merge({},data[id],req.body)
   const newData = {...data, [id]: merged};
   const json = JSON.stringify(newData);
    if (data[id] === undefined) {
      res.send("id does not match any Anime on DataBase");
}else{
    fs.writeFile("anime.json", json);
    res.status(201).send(`id ${id} successfully updated`);
};
};

module.exports = {
    getAnimebyId,
    addNewAnime,
    deleteAnimeById,
    updateAnime
}