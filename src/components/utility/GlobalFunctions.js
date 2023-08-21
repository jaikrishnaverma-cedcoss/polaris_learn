export const createdAt = () => {
    let date = new Date();
    return (
      date.toISOString().split("T")[0] + " " + date.toTimeString().split(" ")[0]
    );
  };
export const idGenerate = (nameKey,arr) => {
    const generatedId = nameKey + "-" + Math.floor(1000 + Math.random() * 9000);
    const index = arr.findIndex(
      (item) => item.id === generatedId
    );
    return index === -1 ? generatedId : idGenerate(nameKey);
  };
  
export const noRef=(initial)=>{
return JSON.parse(JSON.stringify(initial))
}

export const deleteById=(idArr,arr)=>{
  return arr.filter(item=>!idArr.includes(item.id))
}
/**
 * 
 * @param {time in seconds} const [second] = first 
 */
export const secondsToTime=(seconds)=>{
  let d = Number(seconds);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? (h>9?h:"0"+h)+" : " : "00 : ";
    var mDisplay = m > 0 ? (m>9?m:"0"+m) + " : ": "00 : ";
    var sDisplay = s > 0 ? (s>9?s:"0"+s)+ ""  : "00";
    return hDisplay + mDisplay + sDisplay; 
}