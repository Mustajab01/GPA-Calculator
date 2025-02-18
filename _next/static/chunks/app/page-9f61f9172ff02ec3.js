(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{4987:(e,l,t)=>{Promise.resolve().then(t.bind(t,9301))},9301:(e,l,t)=>{"use strict";t.d(l,{default:()=>c});var s=t(5155),i=t(2115),n=t(7334),o=t(5910);t(2248),t(9837);var r=t(5524),d=t(3389);let a=()=>{var e;let{semesters:l,selectedSemester:t,updateSemesterGPA:n,updateSemesterCourses:a}=(0,i.useContext)(d.O),c=l.find(e=>e.id===t),u=e=>{if((null==c?void 0:c.courses.length)<=6){alert("Each semester must have at least 6 courses.");return}let l=null==c?void 0:c.courses.filter(l=>l.id!==e).map((e,l)=>({...e,id:l+1,name:"Course ".concat(l+1)}));a(null==c?void 0:c.id,l)},m=(e,l)=>{let t=null==c?void 0:c.courses.map(t=>t.id===e?{...t,score:l}:t);a(null==c?void 0:c.id,t)},x=i.useCallback(()=>{let e=null==c?void 0:c.courses.filter(e=>""!==e.score);return(null==e?void 0:e.length)===0?0:(null==e?void 0:e.reduce((e,l)=>e+g(l.score),0))/(null==e?void 0:e.length)},[c]),g=e=>e>=85?4:e>=80?3.8:e>=75?3.4:e>=71?3:e>=68?2.8:e>=64?2.4:e>=61?2:e>=57?1.8:e>=53?1.4:e>=50?1:0;return(0,i.useEffect)(()=>{let e=x();e!==(null==c?void 0:c.gpa)&&n(null==c?void 0:c.id,e)},[c,n,x]),(0,s.jsxs)("div",{className:"bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,s.jsx)("h2",{className:"text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text",children:null==c?void 0:c.name}),(0,s.jsx)("div",{className:"bg-indigo-50 px-4 py-2 rounded-lg",children:(0,s.jsxs)("span",{className:"text-indigo-600 font-medium",children:["GPA: ",(0,s.jsx)("span",{className:"text-xl font-bold",children:(null==c?void 0:null===(e=c.gpa)||void 0===e?void 0:e.toFixed(2))||0})]})})]}),(0,s.jsx)("div",{className:"space-y-4 mb-6",children:null==c?void 0:c.courses.map(e=>(0,s.jsxs)("div",{className:"flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition",children:[(0,s.jsx)("span",{className:"font-medium text-gray-700 min-w-[100px]",children:e.name}),(0,s.jsx)("input",{type:"number",value:e.score,onChange:l=>m(e.id,l.target.value),placeholder:"Score (0-100)",min:0,max:100,className:"flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"}),(null==c?void 0:c.courses.length)>6&&(0,s.jsx)("button",{onClick:()=>u(e.id),className:"text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition",disabled:(null==c?void 0:c.courses.length)<=6,children:(0,s.jsx)(r.A,{size:20})})]},e.id))}),(null==c?void 0:c.courses.length)<7&&(0,s.jsxs)("button",{onClick:()=>{if((null==c?void 0:c.courses.length)<7){let e=[...null==c?void 0:c.courses,{id:Math.max(...null==c?void 0:c.courses.map(e=>e.id),0)+1,name:"Course ".concat((null==c?void 0:c.courses.length)+1),score:""}];a(null==c?void 0:c.id,e)}},disabled:(null==c?void 0:c.courses.length)>=7,className:"flex items-center gap-2 w-full justify-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium",children:[(0,s.jsx)(o.A,{size:20}),"Add Course"]})]})},c=()=>{let{selectedSemester:e,addSemester:l}=(0,i.useContext)(d.O);return e?(0,s.jsx)(a,{}):(0,s.jsx)(()=>(0,s.jsx)("div",{className:"flex flex-col items-center justify-center h-full text-center p-6",children:(0,s.jsxs)("div",{className:"max-w-md w-full bg-white rounded-xl shadow-lg p-8",children:[(0,s.jsx)("div",{className:"w-16 h-16 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6",children:(0,s.jsx)(n.A,{size:32,className:"text-white"})}),(0,s.jsx)("h2",{className:"text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text mb-4",children:"Welcome to GPA Calculator"}),(0,s.jsx)("p",{className:"text-gray-600 mb-8",children:"Track your academic progress with ease. Get started by adding your first semester."}),(0,s.jsxs)("button",{onClick:l,className:"flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-3 rounded-lg hover:opacity-90 transition font-medium",children:[(0,s.jsx)(o.A,{size:20}),"Add Your First Semester"]})]})}),{})}}},e=>{var l=l=>e(e.s=l);e.O(0,[524,173,957,441,517,358],()=>l(4987)),_N_E=e.O()}]);