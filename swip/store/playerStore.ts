import {create} from 'zustand';

import { PlayerProps } from '../types/Props';
import { initDatabase, 
        createNewPlayer as dbCreateNewPlayer,
        selectAllPlayers as dbSelectAllPlayers,
        deletePlayerByID} from '../database/db';




interface PlayerStore {
    players: PlayerProps[];
    addPlayer: (player: string) => void;
    fetchPlayers: () => void;
    deletePlayer: (id: number) => void;
}

export const usePlayerStore = create<PlayerStore>((set,get) => ({
    players: [],
    addPlayer: (player: string) =>{
        dbCreateNewPlayer(player).then((insertId)=>{
            const players = get().players;
            set({
                players: [...players, {playerID: insertId, playerName: player}]
            })
        })
    },
    // Fecth all Players Data From DATABASE
    fetchPlayers: () =>{
        dbSelectAllPlayers().then((data)=>{
            set(() =>({players: [...get().players,...data]}))
        })
    },
    deletePlayer: (id: number) =>{
        deletePlayerByID(id).then((id)=>{
            console.log(id)
        })
        //set((state) =>({players: [...state.players.filter((player)=>player.playerID !== id)]}))
        
    },
}));

// Initialize the database
initDatabase();
