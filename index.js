import fastify from 'fastify';
// see axios doc on how to use it
import axios from 'axios';

const app = fastify({logger: true});

const getCatFacts = async (catFactsAmount) => {
    try {
        return (await axios.get(`https://cat-fact.herokuapp.com/facts/random?amount=${catFactsAmount}`)).data
            .map(fact => fact.text)
    } catch (e) {
        return null
    }
}

const getFoxImage = async () => {
    try {
        return (await axios.get('https://randomfox.ca/floof/')).data.image
    } catch (e) {
        return null
    }
}

const getHolidays = async (countryCode) => {
    try {
        return (await axios.get(`https://date.nager.at/api/v2/PublicHolidays/2021/${countryCode}`)).data
    } catch (e) {
        return null
    }
}

app.get('/', async (req, res) => {
    return {
        'foxPicture': await getFoxImage(),
        'catFacts': await getCatFacts(3),
        'holidays': await getHolidays(req.params.countryCode)
    };
});

app.post('/', async (req, res) => {
    return {
        'foxPicture': await getFoxImage(),
        'catFacts': await getCatFacts(3),
        'holidays': await getHolidays(req.body.countryCode)
    };
});

// Run the server!
const start = async () => {
    try {
        await app.listen(5000);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
