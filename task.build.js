/**
 * Created by zmark_000 on 29/12/2016.
 */

let utils = require('utils');

let build = {


    build: function(creep) {

        let buildSite = utils.findFirst(creep, FIND_CONSTRUCTION_SITES);
        
        if (Memory.priorityBuildSite)
        {
            let priorityBuildSite = Game.getObjectById(Memory.priorityBuildSite);
            
            if (priorityBuildSite instanceof ConstructionSite)
            {
                buildSite = priorityBuildSite
            }
            else
            {
                delete Memory.priorityBuildSite;
            }
        }

        if (buildSite)
        {
            if (creep.build(buildSite) == ERR_NOT_IN_RANGE) {
                if (creep.moveTo(buildSite, {noPathFinding: true}) == ERR_NOT_FOUND)
                {
                    creep.moveTo(buildSite);
                }
            }
        }
        else
        {
            // Nothing to build, change role to repairer
            creep.memory.role = 'repairer';
        }
    }
};

module.exports = build;