const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { request } = require("express");
require('dotenv').config();
const fetch = require('node-fetch');
const token = require('./consts');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(express.static(__dirname+'/images'));
// app.use(express.static('public')); 
// app.use('/images', express.static('images'));

const channelsCache = [
    {
        description: "You can send your fun videos to this bot @funet_channel_bot\n\nMe: 📩 @pumych",
        id: -1001368485790,
        membersCounter: 10872,
        photo: { small_file_id: 'AQADBAADLLcxG2xqcVMACAIAA2KAydkW____Ix1lMIwiYHMpBA', small_file_unique_id: 'AQADLLcxG2xqcVMAAQ', big_file_id: 'AQADBAADLLcxG2xqcVMACAMAA2KAydkW____Ix1lMIwiYHMpBA', big_file_unique_id: 'AQADLLcxG2xqcVMB' },
        title: "🅵🆄🅽🅴🆃 - charge of positive emotions",
        type: "channel",
        username: "funet",
        profileImage: "\\images\\funet.jpg",
        category: "Fun"

    },
    {
        id: -1001523161524,
        membersCounter: 1881,
        photo: { small_file_id: 'AQADBAADzbUxGzYV8VMACAIAA0xWkdAW____HcvOg1chv_4pBA', small_file_unique_id: 'AQADzbUxGzYV8VMAAQ', big_file_id: 'AQADBAADzbUxGzYV8VMACAMAA0xWkdAW____HcvOg1chv_4pBA', big_file_unique_id: 'AQADzbUxGzYV8VMB' },
        title: "We are the History",
        type: "channel",
        username: "pfff_history",
        profileImage: "\\images\\pfff_history.jpg",
        category: "Education"
    },
    {
        id: -1001509614260,
        title: "Pumps Leaks",
        username: "pumpleaks",
        type: "channel",
        description: "The only channel run by real whales,we can guarantee you nobody else will ever get Cole to the trading volume in our pumps…\n\nKnow about 100%, 300% and even 1000%+ pumps hours or days before they happen🔥🔥\n\n@pumpleaks",
        photo: {
            small_file_id: "AQADBQADQa4xG2HccFYACAIAA0wNYNEW____U7ijNQAB1B4NKQQ",
            small_file_unique_id: "AQADQa4xG2HccFYAAQ",
            big_file_id: "AQADBQADQa4xG2HccFYACAMAA0wNYNEW____U7ijNQAB1B4NKQQ",
            big_file_unique_id: "AQADQa4xG2HccFYB"
        },
        membersCounter: 122018,
        profileImage: "\\images\\pumpleaks.jpg",
        category: "Other"
    },

];

/* function gets milliseconds and convers them to minutes */
const convertMillisecondsToMinutes = (ms) => {
    const minutes = ms / (60 * 1000);
    return minutes;
}

// const convertMillisecondsToHours = (ms) => {
// 	const hours = ms / (60 * 60 * 1000);
//   return hours;
// }

const getChannelLastUpTimestemp = () => {
    const tmpStartDate = new Date();
    return tmpStartDate;
};

const getAndSaveProfilePhoto = async (filePath, fileName) => {
    try {
        const imgPath = path.resolve(__dirname, 'public/images', `${fileName}.jpg`);
        console.log('imgPath', imgPath);
        

        const res = await axios({
            url: `https://api.telegram.org/file/bot${token.myToken}/${filePath}`,
            method: 'GET',
            responseType: 'stream',
        });

        res.data.pipe(fs.createWriteStream(imgPath));
        // console.log('1');
        return imgPath;

        // @acetravels

    } catch (error) {
        console.log('error', error);
    }
}


cron.schedule('* * * * *', function () {
    // console.log('channelsCache', channelsCache); 
    console.log('running a task every minute');
    // console.log('channelsCache <<<<', channelsCache);
    const nowDate = new Date();
    channelsCache.map(channel => {
        const startDate = channel.startDate;
        const channelID = channel.id;
        if (startDate && channel.id === channelID) {
            // console.log('channelID', channelID);
            // console.log('channel', channel);
            const msBetweenDates = Math.abs(startDate.getTime() - nowDate.getTime());
            const minBetweenDates = convertMillisecondsToMinutes(msBetweenDates)
            if (minBetweenDates >= 1) {
                channel.isDisabled = false;
            }
        }

    })
});



app.get("/", (req, res) => {
    res.send("Welcome to our Telegram Channels Catalog...");
});

app.post("/current-channel", (req, res) => {

    const chat_id = req.query.channel_name;
    const categoty = req.query.category_name;
    // console.log('req.query', req.query);
    
    axios.get(`https://api.telegram.org/bot${token.myToken}/getChat?chat_id=${chat_id}`).then(async (channelDetails) => {
        // console.log('channelDetails', channelDetails.data);
        if (channelDetails.data.ok) {
            let channelObj = channelDetails.data.result;
            channelObj.category = categoty;
            let photoID = channelDetails.data.result.photo.small_file_id;
            let fileName = channelDetails.data.result.username;

            const membersCounterRequest = axios.get(`https://api.telegram.org/bot${token.myToken}/getChatMembersCount?chat_id=${chat_id}`);
            const filePathRequest = axios.get(`https://api.telegram.org/bot${token.myToken}/getFile?file_id=${photoID}`);

            axios.all([membersCounterRequest, filePathRequest]).then(axios.spread(async (...responses) => {

                const membersCounterResponse = responses[0];
                channelObj.membersCounter = membersCounterResponse.data.result
                // console.log('membersCounterResponse', membersCounterResponse.data.result);

                const filePathResponse = responses[1];
                // console.log('filePathResponse', filePathResponse.data.result.file_path);
                let filePath = filePathResponse.data.result.file_path;
                const tmpProfilePhotoPath = await getAndSaveProfilePhoto(filePath, fileName);
                const ProfilePhotoPath = tmpProfilePhotoPath.split("public").pop();;
                console.log('ProfilePhotoPath', ProfilePhotoPath);
                

                channelObj.profileImage = ProfilePhotoPath;
                console.log('channelObj', channelObj);
                
                channelsCache.push(channelObj);
                res.send({ status: 'OK' });

              })).catch(errors => {
                console.log('errors', errors);

                
              });


        } else {
            res.send(channelDetails);
        } 

    }).catch((error) => {
        
        res.status(error.response?.data.error_code);
        res.send({ ...error.response?.data, channelDetails: 'channelDetails' });
    });
    
});

app.get("/channels", (req, res) => {

    const dataToSend = channelsCache.map(({ id, title, description, membersCounter, type, username, isDisabled, profileImage, category }) => {
        return { id, title, description, membersCounter, type, username, isDisabled, profileImage, category };
    })
    console.log('dataToSend', dataToSend);
    res.send(dataToSend);
});

app.post("/update-channel-index", (req, res) => {
    // console.log('req', req.query);

    const chat_id = req.query.channel_id;
    const start_date = getChannelLastUpTimestemp();
    const index = channelsCache.findIndex(object => {
        return object.id === parseInt(chat_id);
    });
    // console.log('index', index)
    if (index !== -1) {

        if (channelsCache[index].isDisabled) {
            console.log('error');

        } else {
            channelsCache[index].isDisabled = true;
            channelsCache[index].startDate = start_date;
            channelsCache.unshift(...channelsCache.splice(index, 1));
            // console.log('channelsCache', channelsCache);
            res.send(channelsCache);
        }
    }
});


const PORT = process.env.Port || 5000;

app.listen(PORT, console.log(`Server runing on port ${PORT}`))


