/**
 * Created by zmark_000 on 29/12/2016.
 */

let carrier = {

    run: function(creep) {

        if (creep.carry.energy == 0)
        {
            let energyStore = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {filter: (source) => source.amount >= creep.carryCapacity / 2});

            if (energyStore)
            {
                if (creep.pickup(energyStore) == ERR_NOT_IN_RANGE)
                {
                    if (creep.moveTo(energyStore, {noPathFinding: true}) == ERR_NOT_FOUND)
                    {
                        creep.moveTo(energyStore);
                    }
                }
            }
            else
            {
                energyStore = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (struct) =>  struct.structureType == STRUCTURE_CONTAINER && struct.store.energy > 100});

                if (energyStore)
                {
                    if (creep.withdraw(energyStore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        if (creep.moveTo(energyStore, {noPathFinding: true}) == ERR_NOT_FOUND)
                        {
                            creep.moveTo(energyStore);
                        }
                    }
                }
            }
        }
        else
        {
            // Find place to drop it off. Prioritise spawner, then extension, then containers

            let target;
            let spawner = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_SPAWN}});

            if (spawner.energy < spawner.energyCapacity)
            {
                target = spawner;
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    if (creep.moveTo(target, {noPathFinding: true}) == ERR_NOT_FOUND)
                    {
                        creep.moveTo(target);
                    }
                }
                return
            }

            let extension = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity}});

            if (extension)
            {
                if (creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    if (creep.moveTo(extension, {noPathFinding: true}) == ERR_NOT_FOUND)
                    {
                        creep.moveTo(extension);
                    }
                }
                return
            }

            let tower = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_TOWER && s.energy / s.energyCapacity < 0.5}});

            if (tower)
            {
                if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    if (creep.moveTo(tower, {noPathFinding: true}) == ERR_NOT_FOUND)
                    {
                        creep.moveTo(tower);
                    }
                }
                return
            }

            let containers = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_CONTAINER && s.store.energy / s.storeCapacity < 0.7}});

            containers = _.sortBy(containers, 'store.energy');
            if (containers[0])
            {
                if (creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    if (creep.moveTo(containers[0], {noPathFinding: true}) == ERR_NOT_FOUND)
                    {
                        creep.moveTo(containers[0]);
                    }
                }
                return
            }

            let storage = creep.room.storage;
            console.log(storage);
            if (storage)
            {
                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    if (creep.moveTo(storage, {noPathFinding: true}) == ERR_NOT_FOUND)
                    {
                        creep.moveTo(storage);
                    }
                }
                return
            }
        }
    }
};

module.exports = carrier;