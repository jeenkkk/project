DROP DATABASE IF EXISTS `Project_Phase_2`;
CREATE DATABASE `Project_Phase_2`;
USE `Project_Phase_2`;

DROP TABLE IF EXISTS `User_info`;
CREATE TABLE `User_info` (
  `Firstname` varchar(20) NOT NULL,
  `Lastname` varchar(20) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `email`	varchar(100) NOT NULL UNIQUE,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`Username`)
);

DROP TABLE IF EXISTS `Login_info`;
CREATE TABLE `Login_info` (
  `Username` varchar(20) NOT NULL,
  `Login_log` DATETIME,
  constraint fk_username foreign key (Username) references User_info(Username),
  PRIMARY KEY (`Username`)
);
insert into `User_info` (`Firstname`,`Lastname`,`Username`,`Password`,`email`,`role`) values
('kongkiet','kuchart','jeen','1234','dog@gmail.com','admin'),
('Tony','Stark','Ironman','Loveyou3000','tony@gmail.com','user');
('Thor','Odinson','Ragnarok','Pointbreak2012','thor@gmail.com','user');


DROP TABLE IF EXISTS `Product_info`;
CREATE TABLE `Product_info` (
  `Product_ID` int(11) NOT NULL,
  `Product_Name` varchar(50) NOT NULL,
  `Product_Price` int(11) NOT NULL,
  `Product_Quantity` int(11) DEFAULT '1' NOT NULL,
  `Product_Description` varchar(256) NOT NULL,
  `Product_Image` varchar(256) NOT NULL,
  `Product_Category` varchar(20) NOT NULL,
	PRIMARY KEY (`Product_ID`)
);

insert into `Product_info` (`Product_ID`,`Product_Name`,`Product_Price`,`Product_Description`,`Product_Image`,`Product_Category`) values
(1,'MEDIUM LADY D-LITE BAG',175000,'The Lady D-Lite bag combines classic elegance with House modernity.','https://wwws.dior.com/couture/ecommerce/media/catalog/product/cache/1/cover_image_1/870x580/17f82f742ffe127f42dca9de82fb58b1/X/p/1633626993_M0565OTDT_M912_E01_ZHC.jpg?imwidth=870','Handbag'),
(2,'COCO MADEMOISELLE',7200,'An extreme, luminous and deep concentration of patchouli infuses COCO MADEMOISELLE Eau de Parfum Intense with a voluptuous dimension.','https://www.chanel.com/images//t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.2/w_1240/coco-mademoiselle-eau-de-parfum-intense-spray-3-4fl-oz--packshot-default-116660-8848376889374.jpg','Perfume'),
(3,'D-LEADER ANKLE BOOT',70000,'The Lady D-Lite bag combines classic elegance with House modernity.','https://img.zolaprod.babsta.net/7Oz71spqvP1Hai6z_r6opa1KduE=/fit-in/850x850/9a2c27711d5b40098f14d720730e4c30','Shoe'),
(4,'ROUGE DIOR - NEW LOOK LIMITED EDITION',1830,'February 1947: Christian Dior dazzled the fashion world just as much as he shook it up with his 1st runway show called "New Look".','https://backend.central.co.th/media/catalog/product/c/d/cds87800425-1.jpg?impolicy=resize&width=553','Lips'),
(5,'J12 CALIBER 12.2 EDITION 1 WATCH, 33 MM',295000,'The J12 watch features the Caliber 12.1 or Caliber 12.2*, self-winding movements manufactured exclusively for CHANEL.','https://www.chanel.com/images//t_one///q_auto:good,f_auto,fl_lossy,dpr_1.2/w_1240/j12-caliber-12-2-edition-1-watch-33-mm-black-black-ceramic-steel-diamond-packshot-default-h6784-8845525843998.jpg','Watch');