import React from 'react'

function GithubButton({width,height,title}) {
  return (
    <div className=" flex bg-black    -z-50 border rounded-sm hover:cursor-pointer" style={{width:width ,height:height}}>
         <img className="m-1 z-20" src='/github-sign.png' height={40} width={40}></img>
         <p className="text-white p-3 text-sm font-mono font-bold">Sign in With Github</p>
    </div>
  )
}

export default GithubButton
