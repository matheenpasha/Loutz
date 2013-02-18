var doEncryption=function() { 
/*This function does a letter to word encryption */

  
	
	var str="keep the winter chill away with this lightweight yet warm baselayer Oasis uses light smooth merino wool in a close fitting enhanced cut to provide comfort";
	var strarray = str.split(" ");
	var res="";
	return {
		encrypt:function(obj1){
			 var obj = obj1.toLowerCase();
			 for(var i=0; i<obj.length; i++){
				var n = obj.charCodeAt(i);
				if(n >= 97 && n <= 122){
				res += strarray[n-97]+" ";
				}
			}
			return res;
				
		}
	};	
};

 var res = doEncryption();
 var out = res.encrypt('matheen');
 alert(out);
