<?php
	
	$page = 0;
	$result = array();
	
	function getRecordsByPage() {
		
		global $result, $page;
		
		$url = "http://dev.interactivemechanics.com/spit-spreads-death/cms/api/animation?_format=json&page=" . $page;
		$ch = curl_init();
		
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_URL, $url);
		
		$temp_result = curl_exec($ch);
		curl_close($ch);
		
		$result = array_merge($result, json_decode($temp_result));		
		print_r("Death Records (Page " . $page . ") data cached. <br/>");
		
		printRecords();
		
	}
	
	function printRecords() {
		
		global $result, $page;
	
		if ($result){
									
			if (count($result) % 1000 == 0){
				
				$page++;
				getRecordsByPage();
				
			} else {
				
				$fp = fopen("./cache/data.json", "w");
				fwrite($fp, print_r(json_encode($result), TRUE));
				fclose($fp);
				
				print_r("<br/> Data caching complete!");
				
			}
		}		
	}
	
	getRecordsByPage();
