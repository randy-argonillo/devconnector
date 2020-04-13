const profileService = require('../services/profile');

async function getProfile(req, res) {
  try {
    const { userId } = req.params;
    const profile = await profileService.getProfile(userId);

    if (!profile) {
      return res.status(404).json({ error: 'User does not have a profile.' });
    }

    return res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'A server error occurred' });
  }
}

async function addUpdateProfile(req, res) {
  try {
    const { userId, body } = req;
    const data = profileService.extractProfileData({ user: userId, ...body });

    const profile = await profileService.getProfile(userId);
    if (profile) {
      const updatedProfile = await profileService.update(data);

      return res.json(updatedProfile);
    }

    const newProfile = await profileService.create(data);
    return res.json(newProfile);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Server Error' });
  }
}

async function getAllProfiles(req, res) {
  try {
    const profiles = await profileService.getProfiles();
    return res.json(profiles);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Server Error' });
  }
}

async function addExperience(req, res) {
  try {
    const { userId } = req;
    const { body: experience } = req;

    const profile = await profileService.getProfile(userId);
    if (!profile) {
      return res.status(401).json({ error: 'User does not have a profile' });
    }

    const updatedProfile = await profileService.addExperience(
      profile,
      experience
    );

    return res.json(updatedProfile);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Server Error' });
  }
}

async function deleteExperience(req, res) {
  try {
    const { userId } = req;
    const { exp_id } = req.params;

    const profile = await profileService.getProfile(userId);
    if (!profile) {
      return res.status(401).json({ error: 'User does not have a profile' });
    }

    const updatedProfile = await profileService.deleteExperience(
      profile,
      exp_id
    );

    return res.json(updatedProfile);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Server Error' });
  }
}

async function addEducation(req, res) {
  try {
    const { userId } = req;
    const { body: education } = req;

    const profile = await profileService.getProfile(userId);
    if (!profile) {
      return res.status(401).json({ error: 'User does not have a profile' });
    }

    const updatedProfile = await profileService.addEducation(
      profile,
      education
    );

    return res.json(updatedProfile);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Server Error' });
  }
}

async function deleteEducation(req, res) {
  try {
    const { userId } = req;
    const { edu_id } = req.params;

    const profile = await profileService.getProfile(userId);
    if (!profile) {
      return res.status(401).json({ error: 'User does not have a profile' });
    }

    const updatedProfile = await profileService.deleteEducation(
      profile,
      edu_id
    );

    return res.json(updatedProfile);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Server Error' });
  }
}

async function getGithubProfile(req, res) {
  try {
    const { username } = req.params;
    const profile = await profileService.getGithubProfile(username);
    return res.json(profile);
  } catch (e) {
    if(e.response.status === 404) {
      return res.status(404).json({ message: 'Github account not found.' });
    }
    
    console.log(e);
    return res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  getProfile,
  addUpdateProfile,
  getAllProfiles,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  getGithubProfile,
};
