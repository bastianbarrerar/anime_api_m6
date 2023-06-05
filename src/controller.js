const { getDefaultResultOrder } = require('dns');
const fs = require('fs/promises');
const _ = require('lodash');
const path = require('path');



const getAnime = async (req, res) => {
  const response = await fs.readFile(
    path.join(__dirname, "../db/anime.json"),
    "utf8"
  );
  const json = JSON.parse(response);
  return json;
};

const home = async (req, res) => {
    const { metadata } = await getAnime();
    res.status(200).send(metadata);
};

const getAnimeAll = async (req, res) => {
  const id = parseInt(req.params.id);
  const { data } = await getAnime();
  res.status(200).send(data);
};

const getAnimebyId = async (req, res) =>{
    const id = parseInt(req.params.id);
    const {data} = await getAnime();
    if(data[id]=== undefined){
        res.json({info: "id does not match any Anime on DataBase"})
    }
    res.status(200).send(data[id]);
};

const addNewAnime = async (req, res) => {
    const id = parseInt(req.params.id);
    const {metadata, data} = await getAnime(); 
    const newData = { ...data, [id]: req.body };
    const newAnimeDB = {metadata:{...metadata},data:{ ...newData}}
    const json = JSON.stringify(newAnimeDB, null, 4);
    if(data[id]) {
        res.json({info: "id already exists"})}
    else {
        fs.writeFile(path.join(__dirname, "../db/anime.json"), json);
        res.status(201).json({info: "anime created"});
    };
    };

const deleteAnimeById = async (req, res) => {
    const id = parseInt(req.params.id);
    const {metadata, data} = await getAnime(); 
    if (data[id] === undefined) {
      res.json({ info: "id does not match any Anime on DataBase" });
    }else{
        delete data[id];
        const newAnimeDB = { metadata: { ...metadata }, data: { ...data } };
        const json = JSON.stringify(newAnimeDB, null, 4);
        fs.writeFile(path.join(__dirname, "../db/anime.json"), json);
        res.status(200).json({info:`anime id ${id} deleted from database`})
    }
}

const updateAnime = async (req, res) => {
    const id = parseInt(req.params.id);
    const {metadata, data} = await getAnime(); 
   const merged = _.merge({},data[id],req.body)
   const newData = {...data, [id]: merged};
    const newAnimeDB = { metadata: { ...metadata }, data: { ...newData } };
   const json = JSON.stringify(newAnimeDB, null, 4);    
    if (data[id] === undefined) {
      res.json({ info: "id does not match any Anime on DataBase" });
}else{
    fs.writeFile(path.join(__dirname, "../db/anime.json"), json);
    res.status(201).json({info:`id ${id} successfully updated`});
};
};

module.exports = {
    getAnimebyId,
    addNewAnime,
    deleteAnimeById,
    updateAnime,
    home,
    getAnimeAll
}