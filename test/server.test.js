const chai = require("chai")
const expect = chai.expect
require("isomorphic-fetch")
it('API works', async()=>{
    const API = await fetch(`https://itunes.apple.com/search?term=drake&entity=song&limit=5`);
    const fetchedData= await API.json()
    expect(fetchedData.results[0].kind).to.equal("song")
}); 