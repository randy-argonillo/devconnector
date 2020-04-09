const fp = require('lodash/fp');

const Profile = require('../models/profile');

async function getProfile(userId) {
  try {
    return Profile.findOne({ user: userId }).populate('user', 'name, avatar');
  } catch (e) {
    throw e;
  }
}

async function getProfiles() {
  try {
    return Profile.find();
  } catch (e) {
    throw e;
  }
}

async function update(data) {
  try {
    return Profile.findOneAndUpdate(
      { user: data.user },
      { $set: data },
      { new: true }
    );
  } catch (e) {
    throw e;
  }
}

async function create(data) {
  try {
    const profile = new Profile(data);
    return profile.save();
  } catch (e) {
    throw e;
  }
}

async function addExperience(profile, experience) {
  try {
    profile.experience.unshift(experience);
    return profile.save();
  } catch (e) {
    throw e;
  }
}

async function deleteExperience(profile, id) {
  try {
    const { experience } = profile;
    profile.experience = experience.filter(exp => exp.id !== id)
    return profile.save();
  } catch(e) {
    throw e;
  }
}

async function addEducation(profile, education) {
  try {
    profile.education.unshift(education);
    return profile.save();
  } catch (e) {
    throw e;
  }
}

async function deleteEducation(profile, id) {
  try {
    const { education } = profile;
    profile.education = education.filter(edu => edu.id !== id)
    return profile.save();
  } catch(e) {
    throw e;
  }
}

function extractProfileData(body) {
  const getSet = _getSet(body);

  return fp.pipe(
    getSet('user'),
    getSet('company'),
    getSet('website'),
    getSet('location'),
    getSet('status'),
    getSet('skills', (value) => value.split(',').map(fp.trim)),
    getSet('bio'),
    getSet('githubusername'),
    getSet('social', (value) => {
      const getSetSocial = _getSet(value);
      return fp.pipe(
        getSetSocial('youtube'),
        getSetSocial('twitter'),
        getSetSocial('facebook'),
        getSetSocial('linkedin'),
        getSetSocial('instagram')
      )({});
    })
  )({});
}

const _getSet = (source) => (fieldName, transFunc) => (obj = {}) => {
  const value = fp.get(fieldName)(source);
  if (fp.isNil(value)) return obj;

  if (transFunc) {
    const newVal = transFunc(value);
    return fp.set(fieldName, newVal)(obj);
  }

  return fp.set(fieldName, value)(obj);
};

module.exports = {
  getProfiles,
  getProfile,
  extractProfileData,
  update,
  create,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation
};
