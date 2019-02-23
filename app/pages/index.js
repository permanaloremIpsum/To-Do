import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

const btnSpace = {
  marginTop: '10px',
};

class Home extends React.Component{
  state = {
    todo : [
            {check:true, text:'Alvin'},
            {check:false, text:'Bambang'},
            {check:false, text:'Vale'},
            {check:false, text:'Cahyo'},
            ],
    temporary : [],
    cekfilter : 'all',
    filter : [],
    editable : false,
    editIndex : ''
  }

  filterData = () => {
    const { cekfilter, filter, todo,  } = this.state
    if(cekfilter==="all"){
      this.setState({todo:filter})
    }else if(cekfilter==="uncompleted"){
      let uncompleted = filter.filter((data) => { 
        if(data.check===false){
          return data
        }
      })
      this.setState({todo:uncompleted})
    }else if(cekfilter==="completed"){
      let completed = filter.filter((data) => { 
        if(data.check===true){
          return data
        }
      })
      this.setState({todo:completed}) 
    }
  }

  submit = (e) => {
    e.preventDefault()
    let input = e.target.todoinput.value
    if(input!==''){
      const { todo, filter } = this.state
      filter.push({
        check: false,
        text:e.target.todoinput.value
      });
      this.setState({filter, todo:filter})
      e.target.todoinput.value = ''
    }
    this.filterData()
  }

  done = () => {
    this.setState({editable:false})
  }

  remove = (i) => {
    const { todo } = this.state
    todo.splice(i, 1);
    this.setState({todo, filter:todo})
  }

  edit = (i) => {
    const { editable, editIndex, todo } = this.state
    let temporary = todo.map((data) => {
      return data
    })
    this.setState({temporary,editable:true, editIndex:i})
  }

  change = (e, i) => {
    const { todo, temporary, check, filter } = this.state
    todo[i].text = e.target.value
    this.setState({todo})
  }

  completedCheck = (e, i) => {
    const { todo } = this.state
    let check = e.target.checked
    if(!check){
      todo[i].check = false
    }else{
      todo[i].check = true
    }
    this.setState({todo})
    this.filterData()
  }

  groupFunction = async (cek) => {
    const { cekfilter } = this.state
    await this.setState({cekfilter:cek})
    this.filterData()
  }

  isActive = (val) => {
    const { cekfilter } = this.state
    let active = (val===cekfilter) ? 'active' : ''
    return active + ' waves-effect waves-light btn grey btnSpace'
  }

  keydownFunction = (event) => {
    const {editable, todo, temporary, filter} = this.state
    if(editable){
      if(event.keyCode === 13) {
        this.setState({todo,editable:false})
      }else if(event.keyCode === 27) {
        this.setState({todo:temporary,filter:temporary,editable:false})
      }
    }    
  }

  search = (e) => {
    const { todo, filter } = this.state
    let newList = filter.filter((data) =>{
      const lc = {
        check : data.check,
        text : data.text.toLowerCase()
      }
      const search = e.target.value.toLowerCase()
      return lc.text.includes(search)
    })
    this.setState({todo:newList,filter:newList})
    console.log(newList)
  }

  componentDidMount = async () => {
    document.title = "To-Do"
    document.addEventListener("keydown", this.keydownFunction, false);
    const { todo } = this.state
    let filter = todo.map((data) => {
      return data
    })
    await this.setState({filter})
    this.filterData()
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.keydownFunction, false);
  } 

  render(){
    const {todo, editable, editIndex} = this.state
    return(
      <div> 
        <div className="row">
          <div className="col s6 offset-s3">
            <div className="card">
              <div className="card-action">
                <span className="card-title">To-Do</span>
                  <div className="search-wrapper">
                    <input className="input-search" type="text" name="search" placeholder="Search" onChange={(e)=>{return this.search(e)}}/>
                    <i className="material-icons">search</i>
                  </div>
              </div>
              <div className="card-content">
                {
                  todo.length ? todo.map((data, i) => (
                    <ul key={i} className="collection">
                      {
                        editable && editIndex==i ?
                        <div>
                          <input type="text" className="validate col s10" name="changeinput" value={data.text} onChange={(e)=>{return this.change(e,i)}}/>
                          <a className="btn-floating btn-small btnMiddle waves-effect waves-light green right" onClick={this.done}><i className="material-icons">check_circle</i></a>
                        </div> :
                        <div>
                          <label className="col s1 checkSpace" >
                            <input type="checkbox" checked={data.check} onChange={(e)=>{return this.completedCheck(e,i)}}/>
                            <span></span>
                          </label>
                          <li className="collection-item" onClick={()=>{return this.edit(i)}}>
                            {data.text}
                          </li>
                          <a className="btn-floating btn-small btnMiddle waves-effect waves-light red right" onClick={(e)=>{return this.remove(i)}}><i className="material-icons">delete_forever</i></a> 
                        </div>                        
                      }
                    </ul>
                  )) : ''
                }
              </div>
              <div className="card-action">
                <form action="POST" onSubmit={this.submit}>
                  <div className="row">
                    <div className="col s10">
                      <input placeholder="Nama" type="text" className="validate" name="todoinput"/>
                    </div>
                    <div className="col s2">
                      <button className="waves-effect waves-light btn" href="#" style={btnSpace}>Simpan</button>
                    </div>
                  </div>
                </form>
                <div>
                  <button className={this.isActive('all')} href="#" onClick={()=>this.groupFunction('all')}>All</button>
                  <button className={this.isActive('uncompleted')} href="#" onClick={()=>this.groupFunction('uncompleted')}>Uncompleted</button>
                  <button className={this.isActive('completed')} href="#" onClick={()=>this.groupFunction('completed')}>Completed</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home