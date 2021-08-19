import React,{useState,useEffect} from 'react'

function VoteContent(props) {
    let storeState = props.store.getState()
    let [supNum,setSupNum] = useState(storeState.supNum)
    let [oppNum,setOppNum] = useState(storeState.oppNum)
    let [a,setA] = useState(_=>0)
    useEffect(()=>{
        props.store.subscribe(()=>{
            // setSupNum(supNum)
            // setOppNum(oppNum)
            setA(a+1)
        })
    
    },[])
    return<>
    <p>支持：{props.store.getState().supNum}</p>
    <p>反对：{props.store.getState().oppNum}</p>
    </>
}
function Button(props) {
    let store = props.store;
    return<>
    <button onClick={()=>{
        store.dispatch({
            type:"CHANGE_SUP",
            n:10 
        })
    }}>支持</button>
    <button onClick={()=>{
        store.dispatch({
            type:"CHANGE_OPP",
            m:10 
        })
    }}>反对</button>
    </>
}
class Vote extends React.Component {
    constructor(props){
        super(props)
    }
    /**
     * 获取REDUX中的状态信息 GET-STATE
     * 像REDUX事件池中追加方法（目的： 容器中的状态改变，执行这个方法，控制当然组件重新渲染）
     *  SUB-SCRIBE
     */
    state = {}
    render(){
        let store = this.props.store
        let {supNum,oppNum} = store.getState();
        return<div>
            <h3>投票组件：<span>N:{supNum+oppNum}</span></h3>
            <VoteContent store={store}></VoteContent>
            <Button store={store}></Button>
        </div>
    }
    componentDidMount() {
        // subscribe 的返回值是从事件池中移除方法的函数：unSubscribe
        let unSubscribe = this.props.store.subscribe(()=>{
            this.forceUpdate()
        })
    }
}

export default Vote;