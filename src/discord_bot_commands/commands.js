

const get_user_data = (msg) => {
  const users     =  msg.channel.guild.members;
  const user_data =  [];

  for (let [k,v] of users.entries()) {
    const user =  v.user;
    user_data.push({
      'user_id'       :  user.id,
      'username'      :  user.username,
      'discriminator' :  user.discriminator,
    });
  }
  return user_data;
}
