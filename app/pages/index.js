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
            {check:false, text:'Cahyo'},
            ],
    temporary : [],
    editable : false,
    editIndex : ''
  }

  submit = (e) => {
    e.preventDefault()
    let input = e.target.todoinput.value
    if(input!==''){
      const { todo } = this.state
      todo.push({
        check: false,
        text:e.target.todoinput.value
      });
      this.setState({todo})
      e.target.todoinput.value = ''
    }
  }

  done = () => {
    this.setState({editable:false})
  }

  remove = (i) => {
    const { todo } = this.state
    todo.splice(i, 1);
    this.setState({todo})
  }

  edit = (i) => {
    const { editable, editIndex, todo } = this.state
    // let temporary = Array.from(todo)
    let temporary = todo.map((data) => {
      return {
        check : data.check,
        text: data.text
      }
    })
    this.setState({temporary,editable:true, editIndex:i})
    // console.log(temporary)
  }

  change = (e, i) => {
    const { todo, temporary, check } = this.state
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
    // console.log(!e.target.checked)
  }
  
  // chek key apakah complete
  // kalau iya maka lakukan perulangan
  // return data yang cek true
  // kemudian di setState ke todo
  groupFunction = (cek) => {
    const { todo } = this.state
    if(cek==="all"){
      this.setState({todo})
      console.log(todo)
    }else if(cek==="uncompleted"){
      let uncompleted = todo.filter((data) => { 
        if(data.check===false){
          return {
          check : data.check,
          text: data.text
          }
        }
      })
      console.log(uncompleted)
      // this.setState({todo:uncompleted})
    }else if(cek==="completed"){
      let completed = todo.filter((data) => { 
        if(data.check===true){
          return {
          check : data.check,
          text: data.text
          }
        }
      })
      console.log(completed)
      // this.setState({todo:completed})
    }
  }

  keydownFunction = (event) => {
    const {editable, todo, temporary} = this.state
    if(editable){
      if(event.keyCode === 13) {
        this.setState({todo,editable:false})
      }else if(event.keyCode === 27) {
        this.setState({todo:temporary,editable:false})
      }
    }    
  }
  componentDidMount(){
    document.addEventListener("keydown", this.keydownFunction, false);
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
              <div className="card-content">
                <span className="card-title">To-Do</span>
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
                  <button className="waves-effect waves-light btn grey btnSpace" href="#" onClick={()=>this.groupFunction('all')}>All</button>
                  <button className="waves-effect waves-light btn grey btnSpace" href="#" onClick={()=>this.groupFunction('uncompleted')}>Uncompleted</button>
                  <button className="waves-effect waves-light btn grey btnSpace" href="#" onClick={()=>this.groupFunction('completed')}>Completed</button>
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