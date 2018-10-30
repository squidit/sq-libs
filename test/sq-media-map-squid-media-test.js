/* eslint-disable */
const chai = require('chai');
const { expect } = require('chai');
const mapSquidMedia = require('../sq-media-mapping/src/map-squid-media');
const mock = require('./mock/squid-media-mock');

describe('Squid medias mapping to features for CTR prediction', () => {
  it('should return an array of feature values for every media sent as parameter', (done) => {
    const result = mapSquidMedia(mock);
    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('array');
    expect(result.length).to.be.equal(mock.length);

    done();
  });

  it('should return one array of feature values for media sent as parameter', (done) => {
    const result = mapSquidMedia(mock[0]);
    expect(result).to.be.an('array');
    expect(result[0]).to.not.be.an('array');

    done();
  });

  it('should map a Squid media to features for CTR prediction', (done) => {
    const result = mapSquidMedia(mock[1]);

    expect(result[0]).to.be.equal(true);
    expect(result[1]).to.be.equal(true);
    expect(result[2]).to.be.equal(true);
    expect(result[3]).to.be.equal(true);
    expect(result[4]).to.be.equal(false);
    expect(result[5]).to.be.equal(false);
    expect(result[6]).to.be.equal(false);
    expect(result[7]).to.be.equal(false);
    expect(result[8]).to.be.equal(true);
    expect(result[9]).to.be.equal(false);
    expect(result[10]).to.be.equal(false);
    expect(result[11]).to.be.equal(false);
    expect(result[12]).to.be.equal(false);
    expect(result[13]).to.be.equal(false);
    expect(result[14]).to.be.equal(true);
    expect(result[15]).to.be.equal(false);
    expect(result[16]).to.be.equal(false);
    expect(result[17]).to.be.equal(false);
    expect(result[18]).to.be.equal(false);
    expect(result[19]).to.be.equal(false);
    expect(result[20]).to.be.equal(true);
    expect(result[21]).to.be.equal(false);
    expect(result[22]).to.be.equal(false);
    expect(result[23]).to.be.equal(false);
    expect(result[24]).to.be.equal(false);
    expect(result[25]).to.be.equal(false);
    expect(result[26]).to.be.equal(false);
    expect(result[27]).to.be.equal(false);
    expect(result[28]).to.be.equal(false);
    expect(result[29]).to.be.equal(false);
    expect(result[30]).to.be.equal(false);
    expect(result[31]).to.be.equal(false);
    expect(result[32]).to.be.equal(false);
    expect(result[33]).to.be.equal(false);
    expect(result[34]).to.be.equal(3170);
    expect(result[35]).to.be.equal(144);
    expect(result[36]).to.be.equal('Brown');
    expect(result[37]).to.be.equal('Brown');
    expect(result[38]).to.be.closeTo(0.14, 0.01);
    expect(result[39]).to.be.closeTo(0.04, 0.01);
    expect(result[40]).to.be.closeTo(0, 0.01);
    expect(result[41]).to.be.closeTo(0.01, 0.01);
    expect(result[42]).to.be.closeTo(0.79, 0.01);
    expect(result[43]).to.be.closeTo(0, 0.01);
    expect(result[44]).to.be.closeTo(0, 0.01);
    expect(result[45]).to.be.closeTo(0, 0.01);
    expect(result[46]).to.be.equal(0.0300597846508026);
    expect(result[47]).to.be.equal(0.0248197987675667);
    expect(result[48]).to.be.equal('Normal');

    done();
  });
});
