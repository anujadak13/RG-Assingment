import { sequelize } from '../db.js';
import { User } from './user.model.js';
import { Project } from './project.model.js';

User.hasMany(Project, { foreignKey: 'userId' })
Project.belongsTo(User, { foreignKey: 'userId' })

sequelize.sync({ force: false }).then(() => {
    console.log('Database and tables created!')
});

export { 
    User, Project 
}
