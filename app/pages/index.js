import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

class Home extends React.Component{
  state = {
    todo : ['Alvin', 'Bambang', 'Cahyo', 'Depri', 'Edo']
  }

  submit = (e) => {
    e.preventDefault()
    let { input } = e.target.todoinput.value
    if(input!==''){
      const { todo } = this.state
      todo.push(e.target.todoinput.value);
      this.setState({todo});
      e.target.todoinput.value = ''
    }

  }
  render(){
    const {todo} = this.state;
    return(
      <div> 
        <div className="row">
          <div className="col s6 offset-s3">
            <div className="card">
              <div className="card-content">
                <span className="card-title">To-Do</span>
                {
                  todo.length && todo.map((data, i) => (
                    <ul key={i} className="collection">
                      <li className="collection-item">{data}</li>
                    </ul>
                  ))
                }
              </div>
              <div className="card-action">
                <form action="POST" onSubmit={this.submit}>
                  <input placeholder="Nama" type="text" className="validate" name="todoinput"/>
                  <button className="waves-effect waves-light btn" href="#">Simpan</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home
