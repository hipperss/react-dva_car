
export default{
    "namespace" : "carshow",
    "state" : {
        "images" :{},
        "position" : {
            "album" : "view",
            "color" : "",
            "idx" : 0
        },
        "directory": ""
    },
    "reducers":{
        init(state,{result,directory}){
            
            return {
                ...state,
                "images" : result,
                "position" : {
                    ...state.position,
                    "color" : state.position.color
                },
                directory
            }
        },
        changealbum(state,{album}){
            return {
                ...state,
                "position" : {
                    ...state.position,
                    album,
                    "idx" : 0
                }
            }
        },
        changecolor(state,{color}){
            return {
                ...state,
                "position" : {
                    ...state.position,
                    color,
                    "album" :"view",
                    "idx" : 0
                }
            }
        },
        changeidx(state,{idx}){
            return {
                ...state,
                "position" : {
                    ...state.position,
                    idx
                }
            }
        },
        gonext(state,action){
            //图集列表对象
            var albums = state.images[state.position.color]
            var albumsArr = ["view" , "center" , "detail"].filter((item)=>{
                //有的车没有内饰，就得过滤
                return albums.hasOwnProperty(item)
            })
             //当前图集的序号
             var albumIdx = albumsArr.indexOf(state.position.album);
             //当前颜色数组
             var colorArr = Object.keys(state.images);
             //颜色序号
             var colorIdx = colorArr.indexOf(state.position.color);
            
            //没到本图集的末尾
            if(state.position.idx < albums[state.position.album].length-1){
                return {
                    ...state,
                    "position" : {
                        ...state.position,
                        "idx" : state.position.idx + 1
                    }
                }
            }else if(albumIdx < albumsArr.length - 1){
                //到本图集末尾，切换album
                return {
                    ...state,
                    "position" : {
                        ...state.position,
                        "idx" : 0,
                        "album" : albumsArr[albumIdx + 1]
                    }
                }
            }else if(colorIdx < colorArr.length - 1){
                
                //到了本图集末尾就切换颜色
                return {
                    ...state,
                    "position" : {
                        ...state.position,
                        "idx" : 0,
                        "album" : "view",
                        "color" : colorArr[colorIdx + 1]
                    }
                }  
            }else {
                alert("对不起，已经到底了");
                return state;
            }
            
        },
        goprev(state,action){
            //当前的颜色
            var color = state.position.color;
            //当前的显示状态
            var album = state.position.album;
            //这是显示总数，方便查看是否含有这一项
            var albums = Object.keys(state.images[color]);
            
            var albumArr = ["view", "center", "detail"].filter((item) => {
                return  albums.indexOf(item) != -1;
            })
            //显示状态的序号
            const albumIdx = albumArr.indexOf(album);
            //颜色数组
            const colorArr = Object.keys(state.images);
            //颜色序号
            const colorIdx = colorArr.indexOf(color);
            
            if(state.position.idx > 0){
                return {
                    ...state,
                    "position" : {
                        ...state.position,
                        "idx" : state.position.idx - 1
                    }
                }
            }else if(albumIdx > 0){
                album = albumArr[albumIdx - 1];
                return {
                    ...state,
                    "position" : {
                        ...state.position,
                        "idx" : state.images[color][album].length - 1,
                        album
                    }
                }
            }else if(colorIdx > 0){
                color = colorArr[colorIdx - 1];
                albums= Object.keys(state.images[color]);
                albumArr = ["view", "center", "detail"].filter((item) => {
                    return albums.indexOf(item) != -1;
                })
                album = albumArr[albumArr.length - 1];
                return {
                    ...state,
                    "position" : {
                        ...state.position,
                        "idx" : state.images[color][album].length - 1,
                        album,
                        color
                    }
                }
            }else {
                alert("对不起，已经是第一张了");
                return state;
            }
        },
    },
    "effects" : {
        *init_async({directory},{call,put}){
            const {result} = yield fetch("/carimages/" + directory ).then(data=>data.json());
            yield put ({"type" : "init" ,result,directory})
        }
    }
}