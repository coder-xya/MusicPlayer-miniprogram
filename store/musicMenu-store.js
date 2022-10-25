import {HYEventStore} from "hy-event-store"
import {getNewMusicRecommended} from "../service/music-api"

const newSongsStore = new HYEventStore({
    state:{
        newSongs:{}
    },
    actions:{
        getNewSongsAction(ctx){
            getNewMusicRecommended().then((res)=>{
                ctx.newSongs=res.result
            })
        }
    }
})

export {newSongsStore}