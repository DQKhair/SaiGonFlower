USE [master]
GO
/****** Object:  Database [FlowerStore]    Script Date: 12/29/2023 11:59:03 PM ******/
CREATE DATABASE [FlowerStore]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FlowerStore', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER1\MSSQL\DATA\FlowerStore.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'FlowerStore_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER1\MSSQL\DATA\FlowerStore_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [FlowerStore] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FlowerStore].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FlowerStore] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FlowerStore] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FlowerStore] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FlowerStore] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FlowerStore] SET ARITHABORT OFF 
GO
ALTER DATABASE [FlowerStore] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [FlowerStore] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FlowerStore] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FlowerStore] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FlowerStore] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FlowerStore] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FlowerStore] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FlowerStore] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FlowerStore] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FlowerStore] SET  ENABLE_BROKER 
GO
ALTER DATABASE [FlowerStore] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FlowerStore] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FlowerStore] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FlowerStore] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FlowerStore] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FlowerStore] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [FlowerStore] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FlowerStore] SET RECOVERY FULL 
GO
ALTER DATABASE [FlowerStore] SET  MULTI_USER 
GO
ALTER DATABASE [FlowerStore] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FlowerStore] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FlowerStore] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FlowerStore] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [FlowerStore] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [FlowerStore] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'FlowerStore', N'ON'
GO
ALTER DATABASE [FlowerStore] SET QUERY_STORE = ON
GO
ALTER DATABASE [FlowerStore] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [FlowerStore]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Company]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Company](
	[CompanyId] [int] IDENTITY(1,1) NOT NULL,
	[CompanyUserName] [varchar](30) NULL,
	[PassWordCompany] [nvarchar](100) NULL,
	[RoleId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[CompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CountIndex]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CountIndex](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CountMonth] [int] NULL,
	[Date] [date] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customers]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[CustomerId] [int] IDENTITY(1,1) NOT NULL,
	[CustomerName] [nvarchar](50) NULL,
	[CustomerPhone] [char](11) NULL,
	[CustomerAddress] [nvarchar](50) NULL,
	[CustomerStatus] [bit] NULL,
	[CustomerPoint] [int] NULL,
	[CustomerUserName] [varchar](30) NULL,
	[CustomerPassword] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[CustomerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DetailVouchers]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetailVouchers](
	[DetailVoucherId] [int] IDENTITY(1,1) NOT NULL,
	[Quantity] [int] NULL,
	[CustomerId] [int] NULL,
	[VoucherId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[DetailVoucherId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Export]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Export](
	[ExportId] [int] IDENTITY(1,1) NOT NULL,
	[ExportDate] [datetime] NULL,
	[ExportFrom] [int] NULL,
	[ImportId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ExportId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Functions]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Functions](
	[FunctionId] [int] IDENTITY(1,1) NOT NULL,
	[FunctionName] [nvarchar](50) NULL,
	[Route] [nvarchar](200) NULL,
	[RoleId] [int] NULL,
	[Icon] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[FunctionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IE_Status]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IE_Status](
	[IEStatusId] [int] IDENTITY(1,1) NOT NULL,
	[IEStatusName] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[IEStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Import]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Import](
	[ImportId] [int] IDENTITY(1,1) NOT NULL,
	[CreatedDate] [datetime] NULL,
	[ImportDate] [datetime] NULL,
	[TotalQuantity] [int] NULL,
	[StoreId] [int] NULL,
	[IEStatusId] [int] NULL,
	[ExportDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ImportId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImportDetails]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImportDetails](
	[ImportDetail_Id] [int] IDENTITY(1,1) NOT NULL,
	[Quantity] [int] NULL,
	[ImportId] [int] NULL,
	[Material_Id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ImportDetail_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Likes]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Likes](
	[LikeId] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NULL,
	[CustomerId] [int] NULL,
	[LikeStatus] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[LikeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Materials]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Materials](
	[Material_Id] [int] IDENTITY(1,1) NOT NULL,
	[MaterialName] [nvarchar](50) NULL,
	[Supplier] [nvarchar](100) NULL,
	[Quantity] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Material_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[News]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[News](
	[NewsId] [int] IDENTITY(1,1) NOT NULL,
	[Content] [nvarchar](max) NULL,
	[NewsDate] [datetime] NULL,
	[CompanyId] [int] NULL,
	[Status] [bit] NULL,
	[ExpireDate] [datetime] NULL,
	[Title] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[NewsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetails]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetails](
	[OrderDetail_Id] [int] IDENTITY(1,1) NOT NULL,
	[Quantity] [int] NULL,
	[Price] [float] NULL,
	[OrderId] [int] NULL,
	[ProductId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[OrderDetail_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderMethods]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderMethods](
	[OrderMethodId] [int] IDENTITY(1,1) NOT NULL,
	[OrderMethodName] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[OrderMethodId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderId] [int] IDENTITY(1,1) NOT NULL,
	[OrderDate] [datetime] NULL,
	[TotalQuantity] [int] NULL,
	[TotalPrice] [float] NULL,
	[NameCusNonAccount] [nvarchar](50) NULL,
	[PhoneCusNonAccount] [char](11) NULL,
	[AddressCusNonAccount] [nvarchar](100) NULL,
	[CustomerId] [int] NULL,
	[OrderStatusId] [int] NULL,
	[OrderMethodId] [int] NULL,
	[StoreId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderStatus]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderStatus](
	[OrderStatusId] [int] IDENTITY(1,1) NOT NULL,
	[OrderStatusName] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[OrderStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[ProductId] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [nvarchar](50) NULL,
	[Price] [float] NULL,
	[Discount] [bit] NULL,
	[Image1] [nvarchar](max) NULL,
	[CategoryId] [int] NULL,
	[RecipeId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductViews]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductViews](
	[ProductViewId] [int] NOT NULL,
	[ProductId] [int] NULL,
	[CustomerId] [int] NULL,
	[ViewCount] [int] NULL,
	[PurchaseCount] [int] NULL,
 CONSTRAINT [PK_ProductView] PRIMARY KEY CLUSTERED 
(
	[ProductViewId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Recipe]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Recipe](
	[RecipeId] [int] IDENTITY(1,1) NOT NULL,
	[RecipeName] [nvarchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[RecipeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RecipeDetails]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RecipeDetails](
	[RecipeDetailId] [int] IDENTITY(1,1) NOT NULL,
	[Quantity] [int] NULL,
	[MaterialId] [int] NULL,
	[RecipeId] [int] NULL,
 CONSTRAINT [PK_RecipeDetail] PRIMARY KEY CLUSTERED 
(
	[RecipeDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reviews]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reviews](
	[ReviewId] [int] IDENTITY(1,1) NOT NULL,
	[Star] [int] NULL,
	[ContentReviews] [nvarchar](max) NULL,
	[ReviewsDate] [datetime] NULL,
	[ProductId] [int] NULL,
	[CustomerId] [int] NULL,
	[OrderId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ReviewId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[RoleId] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StockDetails]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StockDetails](
	[StockDetail_Id] [int] IDENTITY(1,1) NOT NULL,
	[Quantity] [int] NULL,
	[StoreId] [int] NULL,
	[Material_Id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[StockDetail_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StoreDetails]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StoreDetails](
	[StoreDetail_Id] [int] IDENTITY(1,1) NOT NULL,
	[Quantity] [int] NULL,
	[StoreId] [int] NULL,
	[ProductId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[StoreDetail_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stores]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stores](
	[StoreId] [int] IDENTITY(1,1) NOT NULL,
	[StoreName] [nvarchar](50) NULL,
	[StorePhone] [char](11) NULL,
	[StoreStreet] [nvarchar](50) NULL,
	[StoreWard] [nvarchar](30) NULL,
	[StoreDistrict] [nvarchar](30) NULL,
	[StoreUserName] [varchar](30) NULL,
	[StorePassword] [nvarchar](100) NULL,
	[StoreStatus] [bit] NULL,
	[RoleId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[StoreId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vouchers]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vouchers](
	[VoucherId] [int] IDENTITY(1,1) NOT NULL,
	[VoucherName] [nvarchar](50) NULL,
	[VoucherPoint] [int] NULL,
	[VoucherValue] [float] NULL,
	[VoucherQuantity] [int] NULL,
	[DateExpire] [datetime] NULL,
	[CompanyId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[VoucherId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Categories] ON 

INSERT [dbo].[Categories] ([CategoryId], [CategoryName]) VALUES (1, N'Fresh Flower')
INSERT [dbo].[Categories] ([CategoryId], [CategoryName]) VALUES (2, N'Dried Flower')
INSERT [dbo].[Categories] ([CategoryId], [CategoryName]) VALUES (3, N'Other Material')
SET IDENTITY_INSERT [dbo].[Categories] OFF
GO
SET IDENTITY_INSERT [dbo].[Company] ON 

INSERT [dbo].[Company] ([CompanyId], [CompanyUserName], [PassWordCompany], [RoleId]) VALUES (1, N'admin', N'$2a$12$EIM5QvU2INck0sgIPAVimubzO5bLvdSDx4HKRt6pa5ewzYigiFpZa', 1)
SET IDENTITY_INSERT [dbo].[Company] OFF
GO
SET IDENTITY_INSERT [dbo].[CountIndex] ON 

INSERT [dbo].[CountIndex] ([Id], [CountMonth], [Date]) VALUES (2, 189, CAST(N'2023-08-01' AS Date))
INSERT [dbo].[CountIndex] ([Id], [CountMonth], [Date]) VALUES (29, 65, CAST(N'2023-09-26' AS Date))
INSERT [dbo].[CountIndex] ([Id], [CountMonth], [Date]) VALUES (31, 132, CAST(N'2023-10-31' AS Date))
INSERT [dbo].[CountIndex] ([Id], [CountMonth], [Date]) VALUES (34, 169, CAST(N'2023-11-01' AS Date))
INSERT [dbo].[CountIndex] ([Id], [CountMonth], [Date]) VALUES (37, 85, CAST(N'2023-12-01' AS Date))
SET IDENTITY_INSERT [dbo].[CountIndex] OFF
GO
SET IDENTITY_INSERT [dbo].[Customers] ON 

INSERT [dbo].[Customers] ([CustomerId], [CustomerName], [CustomerPhone], [CustomerAddress], [CustomerStatus], [CustomerPoint], [CustomerUserName], [CustomerPassword]) VALUES (1, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 10, TP. Hồ Chí Minh', 1, 190000, N'ngocphuc', N'$2a$10$eXyovlO68habU63514PW8urWnKfDMBzKIo0PwT8bwt9T2BUnbVtA2')
INSERT [dbo].[Customers] ([CustomerId], [CustomerName], [CustomerPhone], [CustomerAddress], [CustomerStatus], [CustomerPoint], [CustomerUserName], [CustomerPassword]) VALUES (2, N'Chiêm Đức Giang', N'0984789682 ', N'Quận 6, TP. Hồ Chí Minh', 1, 100000, N'giang', N'$2a$10$DwgtmZUgHLOCM5OIkZ7f8eNaIwNhE9KWzXA8LP6bSV5YFEsyG5jGm')
INSERT [dbo].[Customers] ([CustomerId], [CustomerName], [CustomerPhone], [CustomerAddress], [CustomerStatus], [CustomerPoint], [CustomerUserName], [CustomerPassword]) VALUES (3, N'Đinh Quang Khải', N'0589784580 ', N'Tân Bình, TP. Hồ Chí Minh', 1, 5000, N'khai', N'$2a$10$DwgtmZUgHLOCM5OIkZ7f8eNaIwNhE9KWzXA8LP6bSV5YFEsyG5jGm')
INSERT [dbo].[Customers] ([CustomerId], [CustomerName], [CustomerPhone], [CustomerAddress], [CustomerStatus], [CustomerPoint], [CustomerUserName], [CustomerPassword]) VALUES (4, N'Tống Bảo Hiệp', N'0549875215 ', N'Phú Nhuận, TP. Hồ Chí Minh', 1, 90000, N'hiep', N'$2a$10$zpjhDSzrRSXbwDXcAHmmputT53CfzGNQcn2kj8C5YlgVqyvqKq56O')
INSERT [dbo].[Customers] ([CustomerId], [CustomerName], [CustomerPhone], [CustomerAddress], [CustomerStatus], [CustomerPoint], [CustomerUserName], [CustomerPassword]) VALUES (5, N'Trần Văn Đang', N'0958741147 ', NULL, 1, 0, N'customer', N'$2a$10$WNf2hg9Se35SyzhdTGscsum3oMN5iYWYXasLM72XsEKXSHnsaFara')
INSERT [dbo].[Customers] ([CustomerId], [CustomerName], [CustomerPhone], [CustomerAddress], [CustomerStatus], [CustomerPoint], [CustomerUserName], [CustomerPassword]) VALUES (6, N'Lê Thanh Sang', N'0447886981 ', NULL, 1, 0, N'customer2', N'$2a$10$bnZ0/HhmnJacg3FnHASFOOQm3HYoK6eYdUtolupA3p7AHdk8WH3xC')
INSERT [dbo].[Customers] ([CustomerId], [CustomerName], [CustomerPhone], [CustomerAddress], [CustomerStatus], [CustomerPoint], [CustomerUserName], [CustomerPassword]) VALUES (7, N'Nguyễn An', N'0325498475 ', NULL, 1, 0, N'customer3', N'$2a$10$Ms.V5fzbuLMjjPGA4IPfnuxbtS2ybMK9Ae5qNJghNK2b9NMa/WkW6')
INSERT [dbo].[Customers] ([CustomerId], [CustomerName], [CustomerPhone], [CustomerAddress], [CustomerStatus], [CustomerPoint], [CustomerUserName], [CustomerPassword]) VALUES (8, N'Trương Phú Lợi', N'0454731584 ', NULL, 1, 0, N'customer4', N'$2a$10$vM144SmDbWb0lN0n8G9b8uu3emYwm4o9.gLdFK2/71TiYiwpJkojC')
INSERT [dbo].[Customers] ([CustomerId], [CustomerName], [CustomerPhone], [CustomerAddress], [CustomerStatus], [CustomerPoint], [CustomerUserName], [CustomerPassword]) VALUES (9, N'Nguyen Ngoc Phuong', N'0205498542 ', NULL, 1, 0, N'customer5', N'$2a$10$KEwstaWj2nfEAs1i3dXnCu6Uu1id3vr.KqZz6lSwZWGOdA5Wieyfq')
INSERT [dbo].[Customers] ([CustomerId], [CustomerName], [CustomerPhone], [CustomerAddress], [CustomerStatus], [CustomerPoint], [CustomerUserName], [CustomerPassword]) VALUES (10, N'Đặng Thanh Tuấn', N'0158745625 ', NULL, 1, 0, N'customer6', N'$2a$10$cNTH/03XDQ.3H1zT8IwtU.jvxlDnIfANEy5RpudTlYFflOq89cOqC')
INSERT [dbo].[Customers] ([CustomerId], [CustomerName], [CustomerPhone], [CustomerAddress], [CustomerStatus], [CustomerPoint], [CustomerUserName], [CustomerPassword]) VALUES (11, N'Lâm Phương Nghi', N'0994121584 ', NULL, 1, 0, N'customer7', N'$2a$10$uQExG27ux.Pfg8nSeGK/Ze8h.nMPQ2ztmEEFauVfnsjTyqPVQBmZK')
INSERT [dbo].[Customers] ([CustomerId], [CustomerName], [CustomerPhone], [CustomerAddress], [CustomerStatus], [CustomerPoint], [CustomerUserName], [CustomerPassword]) VALUES (12, N'Ngọc Phúc', N'1234567890 ', NULL, 1, 0, N'phuc', N'$2a$10$jcR7RzeZtdwQJN2h.aUVWuHL8EzxSvjLobAriybcoRE7WXxnxjlSO')
SET IDENTITY_INSERT [dbo].[Customers] OFF
GO
SET IDENTITY_INSERT [dbo].[DetailVouchers] ON 

INSERT [dbo].[DetailVouchers] ([DetailVoucherId], [Quantity], [CustomerId], [VoucherId]) VALUES (1, 0, 1, 1)
INSERT [dbo].[DetailVouchers] ([DetailVoucherId], [Quantity], [CustomerId], [VoucherId]) VALUES (2, 1, 1, 2)
INSERT [dbo].[DetailVouchers] ([DetailVoucherId], [Quantity], [CustomerId], [VoucherId]) VALUES (3, 1, 1, 4)
SET IDENTITY_INSERT [dbo].[DetailVouchers] OFF
GO
SET IDENTITY_INSERT [dbo].[Export] ON 

INSERT [dbo].[Export] ([ExportId], [ExportDate], [ExportFrom], [ImportId]) VALUES (1, CAST(N'2023-10-20T00:00:00.000' AS DateTime), 1, 1)
SET IDENTITY_INSERT [dbo].[Export] OFF
GO
SET IDENTITY_INSERT [dbo].[Functions] ON 

INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (1, N'Dashboard', N'index.html', 1, N'bi bi-grid')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (2, N'Dashboard', N'index.html', 2, N'bi bi-grid')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (3, N'Quản lý cửa hàng', N'quanlycuahang.html', 1, N'bi bi-shop')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (4, N'Quản lý kho', N'quanlykho.html', 1, N'bi bi-box-seam')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (5, N'Quản lý kho', N'quanlykho.html', 2, N'bi bi-box-seam')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (6, N'Quản lý nhập xuất', N'quanlynhapxuat.html', 1, N'bi bi-arrow-down-up')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (7, N'Quản lý nhập xuất', N'quanlynhapxuat.html', 2, N'bi bi-arrow-down-up')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (8, N'Quản lý công thức', N'quanlycongthuc.html', 1, N'bi bi-book')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (9, N'Quản lý công thức', N'quanlycongthuc.html', 2, N'bi bi-book')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (10, N'Quản lý loại sản phẩm', N'quanlyloaisanpham.html', 1, N'bi bi-diagram-3')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (11, N'Quản lý sản phẩm', N'quanlysanpham.html', 1, N'bi bi-patch-check')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (12, N'Quản lý sản phẩm', N'quanlysanpham.html', 2, N'bi bi-patch-check')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (13, N'Quản lý khuyến mãi', N'quanlykhuyenmai.html', 1, N'bi bi-tags')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (14, N'Quản lý khuyến mãi', N'quanlykhuyenmai.html', 2, N'bi bi-tags')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (16, N'Quản lý đơn hàng', N'quanlydonhang.html', 2, N'bi bi-card-checklist')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (17, N'Quản lý khách hàng', N'quanlykhachhang.html', 1, N'bi bi-person')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (18, N'Quản lý khách hàng', N'quanlykhachhang.html', 2, N'bi bi-person')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (19, N'Quản lý tin tức', N'tintuc.html', 1, N'bi bi-globe2')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (20, N'Báo cáo thống kê', N'quanlydoanhthu.html', 1, N'bi bi-bar-chart')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (21, N'Báo cáo thống kê', N'quanlydoanhthu.html', 2, N'bi bi-bar-chart')
INSERT [dbo].[Functions] ([FunctionId], [FunctionName], [Route], [RoleId], [Icon]) VALUES (22, N'Quản lý đánh giá', N'quanlyreviews.html', 2, N'bi bi-person')
SET IDENTITY_INSERT [dbo].[Functions] OFF
GO
SET IDENTITY_INSERT [dbo].[IE_Status] ON 

INSERT [dbo].[IE_Status] ([IEStatusId], [IEStatusName]) VALUES (1, N'Chờ xử lý')
INSERT [dbo].[IE_Status] ([IEStatusId], [IEStatusName]) VALUES (2, N'Chờ xác nhận')
INSERT [dbo].[IE_Status] ([IEStatusId], [IEStatusName]) VALUES (3, N'Đã nhập hàng')
SET IDENTITY_INSERT [dbo].[IE_Status] OFF
GO
SET IDENTITY_INSERT [dbo].[Import] ON 

INSERT [dbo].[Import] ([ImportId], [CreatedDate], [ImportDate], [TotalQuantity], [StoreId], [IEStatusId], [ExportDate]) VALUES (1, CAST(N'2023-10-18T00:00:00.000' AS DateTime), CAST(N'2023-10-31T13:38:58.657' AS DateTime), 50, 1, 3, CAST(N'2023-10-31T13:36:03.477' AS DateTime))
INSERT [dbo].[Import] ([ImportId], [CreatedDate], [ImportDate], [TotalQuantity], [StoreId], [IEStatusId], [ExportDate]) VALUES (2, CAST(N'2023-10-25T22:58:59.737' AS DateTime), NULL, 10, 1, 1, NULL)
INSERT [dbo].[Import] ([ImportId], [CreatedDate], [ImportDate], [TotalQuantity], [StoreId], [IEStatusId], [ExportDate]) VALUES (3, CAST(N'2023-10-25T23:00:18.933' AS DateTime), CAST(N'2023-10-31T13:41:55.733' AS DateTime), 16, 1, 3, CAST(N'2023-10-31T13:37:53.477' AS DateTime))
INSERT [dbo].[Import] ([ImportId], [CreatedDate], [ImportDate], [TotalQuantity], [StoreId], [IEStatusId], [ExportDate]) VALUES (4, CAST(N'2023-10-26T22:14:29.823' AS DateTime), NULL, 17, 1, 2, CAST(N'2023-11-01T02:55:06.610' AS DateTime))
INSERT [dbo].[Import] ([ImportId], [CreatedDate], [ImportDate], [TotalQuantity], [StoreId], [IEStatusId], [ExportDate]) VALUES (5, CAST(N'2023-10-31T13:42:42.813' AS DateTime), CAST(N'2023-10-31T13:43:47.397' AS DateTime), 4, 1, 3, CAST(N'2023-10-31T13:43:20.120' AS DateTime))
INSERT [dbo].[Import] ([ImportId], [CreatedDate], [ImportDate], [TotalQuantity], [StoreId], [IEStatusId], [ExportDate]) VALUES (6, CAST(N'2023-11-01T13:11:08.027' AS DateTime), NULL, 98, 1, 2, CAST(N'2023-11-01T13:11:41.200' AS DateTime))
INSERT [dbo].[Import] ([ImportId], [CreatedDate], [ImportDate], [TotalQuantity], [StoreId], [IEStatusId], [ExportDate]) VALUES (7, CAST(N'2023-11-01T13:37:42.773' AS DateTime), CAST(N'2023-11-01T13:38:29.727' AS DateTime), 20, 1, 3, CAST(N'2023-11-01T13:38:07.447' AS DateTime))
INSERT [dbo].[Import] ([ImportId], [CreatedDate], [ImportDate], [TotalQuantity], [StoreId], [IEStatusId], [ExportDate]) VALUES (8, CAST(N'2023-11-08T13:19:03.553' AS DateTime), CAST(N'2023-11-08T13:20:24.773' AS DateTime), 20, 1, 3, CAST(N'2023-11-08T13:19:45.900' AS DateTime))
INSERT [dbo].[Import] ([ImportId], [CreatedDate], [ImportDate], [TotalQuantity], [StoreId], [IEStatusId], [ExportDate]) VALUES (9, CAST(N'2023-11-23T13:25:05.213' AS DateTime), NULL, 20, 1, 2, CAST(N'2023-11-23T13:25:35.877' AS DateTime))
INSERT [dbo].[Import] ([ImportId], [CreatedDate], [ImportDate], [TotalQuantity], [StoreId], [IEStatusId], [ExportDate]) VALUES (10, CAST(N'2023-12-11T14:03:43.033' AS DateTime), NULL, 20, 1, 2, CAST(N'2023-12-11T14:04:28.150' AS DateTime))
INSERT [dbo].[Import] ([ImportId], [CreatedDate], [ImportDate], [TotalQuantity], [StoreId], [IEStatusId], [ExportDate]) VALUES (11, CAST(N'2023-12-11T14:06:05.840' AS DateTime), NULL, 10, 1, 2, CAST(N'2023-12-11T14:06:32.157' AS DateTime))
INSERT [dbo].[Import] ([ImportId], [CreatedDate], [ImportDate], [TotalQuantity], [StoreId], [IEStatusId], [ExportDate]) VALUES (12, CAST(N'2023-12-11T14:10:52.713' AS DateTime), NULL, 12, 1, 1, NULL)
INSERT [dbo].[Import] ([ImportId], [CreatedDate], [ImportDate], [TotalQuantity], [StoreId], [IEStatusId], [ExportDate]) VALUES (13, CAST(N'2023-12-11T14:12:06.417' AS DateTime), NULL, 20, 1, 1, NULL)
SET IDENTITY_INSERT [dbo].[Import] OFF
GO
SET IDENTITY_INSERT [dbo].[ImportDetails] ON 

INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (1, 50, 1, 1)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (2, 30, 1, 2)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (3, 16, 3, 12)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (4, 1, 4, 13)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (5, 16, 4, 13)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (6, 4, 5, 12)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (7, 20, 6, 1)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (8, 50, 6, 7)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (9, 8, 6, 11)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (10, 10, 6, 13)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (11, 10, 6, 19)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (12, 10, 7, 5)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (13, 10, 7, 11)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (14, 10, 8, 1)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (15, 10, 8, 10)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (16, 10, 9, 5)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (17, 10, 9, 11)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (18, 10, 10, 1)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (19, 10, 10, 2)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (20, 10, 11, 1)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (21, 12, 12, 1)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (22, 15, 13, 1)
INSERT [dbo].[ImportDetails] ([ImportDetail_Id], [Quantity], [ImportId], [Material_Id]) VALUES (23, 5, 13, 2)
SET IDENTITY_INSERT [dbo].[ImportDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[Likes] ON 

INSERT [dbo].[Likes] ([LikeId], [ProductId], [CustomerId], [LikeStatus]) VALUES (1, 2, 1, 0)
INSERT [dbo].[Likes] ([LikeId], [ProductId], [CustomerId], [LikeStatus]) VALUES (2, 3, 1, 0)
INSERT [dbo].[Likes] ([LikeId], [ProductId], [CustomerId], [LikeStatus]) VALUES (3, 1, 1, 0)
INSERT [dbo].[Likes] ([LikeId], [ProductId], [CustomerId], [LikeStatus]) VALUES (4, 13, 1, 0)
INSERT [dbo].[Likes] ([LikeId], [ProductId], [CustomerId], [LikeStatus]) VALUES (5, 18, 1, 1)
SET IDENTITY_INSERT [dbo].[Likes] OFF
GO
SET IDENTITY_INSERT [dbo].[Materials] ON 

INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (1, N'Hoa hồng', N'Dalat Hasfarm', 1000000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (2, N'Hoa tulip', N'Eve Flowers', 999999)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (3, N'Hoa cẩm tú cầu', N'Dalat Hasfarm', 1000000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (4, N'Hoa hướng dương', N'Dalat Hasfarm', 1000000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (5, N'Hoa loa kèn', N'Eve Flowers', 1000000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (6, N'Hoa oải hương', N'Eve Flowers', 1000000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (7, N'Hoa mẫu đơn', N'Dalat Hasfarm', 1000000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (8, N'Hoa cát tường', N'Eve Flowers', 1000000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (9, N'Hoa thạch thảo', N'Dalat Hasfarm', 1000000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (10, N'Hoa baby', N'Eve Flowers', 1000000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (11, N'Giấy crepe', N'Tamidu Luxury', 1000000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (12, N'Vải voan', N'Tamidu Luxury', 1000000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (13, N'Vải lụa', N'Tamidu Luxury', 1000000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (14, N'Vải mesh', N'Passion Flower', 1000000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (15, N'Giấy báo', N'Passion Flower', 100000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (16, N'Giấy kính', N'Passion Flower', 100000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (17, N'Giấy kraft', N'Tamidu Luxury', 100000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (18, N'Dây voan', N'Passion Flower', 100000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (19, N'Dây ruy băng', N'Tamidu Luxury', 100000)
INSERT [dbo].[Materials] ([Material_Id], [MaterialName], [Supplier], [Quantity]) VALUES (20, N'Dây kim tuyến', N'Passion Flower', 999999)
SET IDENTITY_INSERT [dbo].[Materials] OFF
GO
SET IDENTITY_INSERT [dbo].[News] ON 

INSERT [dbo].[News] ([NewsId], [Content], [NewsDate], [CompanyId], [Status], [ExpireDate], [Title]) VALUES (1, N'Sale 20/11', CAST(N'2023-10-18T00:00:00.000' AS DateTime), 1, NULL, NULL, NULL)
INSERT [dbo].[News] ([NewsId], [Content], [NewsDate], [CompanyId], [Status], [ExpireDate], [Title]) VALUES (2, N'<h1><strong>🌟 <span style="color:#c0392b"><span style="font-size:20px">Celebrate the Joy of Christmas with Beautiful Blooms! </span></span>🌟</strong></h1>

<p>🎄 This holiday season, immerse yourself in the enchanting world of flowers at our exquisite flower shop. Discover the perfect floral arrangements that will add elegance and warmth to your festivities.</p>

<p>🌺 From vibrant poinsettias to delicate white lilies, our curated collection captures the spirit of Christmas, ensuring each arrangement is a masterpiece. Let our skilled florists create personalized creations that reflect your unique style and preferences.</p>

<p>💝 Surprise and delight your loved ones with the beauty and fragrance of carefully crafted bouquets. Our flower shop has something for everyone, whether it&#39;s a romantic gesture or a thoughtful gift for a friend or family member.</p>

<p>✨ Let the language of flowers speak for you this Christmas. Visit us at [store address] and infuse your celebrations with elegance and grace. From all of us at [store name], we wish you a magical and joyous Christmas filled with love, laughter, and the beauty of flowers. 🌸</p>

<p><img alt="" src="https://localhost:7126/images/sale_1.jpg" style="border-style:solid; border-width:0px; height:100%; margin:10px 0px; width:100%" /></p>
', CAST(N'2023-10-31T13:59:33.653' AS DateTime), 1, NULL, NULL, NULL)
INSERT [dbo].[News] ([NewsId], [Content], [NewsDate], [CompanyId], [Status], [ExpireDate], [Title]) VALUES (5, N'<p><span style="color:#16a085"><span style="font-size:36px"><strong>🌺 Celebrate Teachers&#39; Day with Beautiful Blooms! 🌺</strong></span></span></p>

<p>📚 This Teachers&#39; Day, show your appreciation and gratitude to the educators who inspire and guide us. At our flower shop, we have the perfect floral arrangements to honor these remarkable individuals.</p>

<p>🌸 Spoil your favorite teachers with stunning bouquets that symbolize admiration, respect, and gratitude. Let our skilled florists create personalized creations that convey your heartfelt sentiments.</p>

<p>💐 From vibrant blooms to delicate arrangements, our curated collection captures the essence of appreciation. Each arrangement is meticulously crafted to reflect the beauty and significance of this special day.<img alt="" src="https://localhost:7126/images/sale_2.png" style="border-style:solid; border-width:0px; height:100%; margin:0px; width:100%" /></p>
', CAST(N'2023-11-01T13:41:17.477' AS DateTime), 1, NULL, NULL, NULL)
INSERT [dbo].[News] ([NewsId], [Content], [NewsDate], [CompanyId], [Status], [ExpireDate], [Title]) VALUES (6, N'<p>aaaaaaaaaaa</p>
', CAST(N'2023-12-11T13:26:14.463' AS DateTime), 1, 1, CAST(N'2023-12-20T00:00:00.000' AS DateTime), N'a')
INSERT [dbo].[News] ([NewsId], [Content], [NewsDate], [CompanyId], [Status], [ExpireDate], [Title]) VALUES (7, N'<p>a</p>
', CAST(N'2023-12-11T13:26:44.993' AS DateTime), 1, 1, CAST(N'2023-12-20T00:00:00.000' AS DateTime), N'NEWS')
SET IDENTITY_INSERT [dbo].[News] OFF
GO
SET IDENTITY_INSERT [dbo].[OrderDetails] ON 

INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (1, 2, 350000, 1, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (2, 2, 400000, 2, 2)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (3, 1, 350000, 2, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (4, 2, 250000, 2, 13)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (5, 2, 350000, 3, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (6, 3, 300000, 3, 3)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (7, 2, 300000, 4, 3)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (8, 2, 350000, 4, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (9, 2, 400000, 5, 2)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (10, 1, 300000, 6, 3)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (11, 3, 400000, 6, 2)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (12, 2, 350000, 6, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (13, 3, 370000, 7, 17)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (14, 2, 350000, 7, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (15, 5, 400000, 8, 2)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (16, 2, 350000, 8, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (17, 2, 300000, 8, 3)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (18, 2, 350000, 9, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (19, 1, 350000, 10, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (20, 1, 300000, 10, 3)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (21, 1, 370000, 10, 17)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (22, 1, 400000, 10, 2)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (23, 2, 250000, 10, 13)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (24, 1, 370000, 11, 17)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (25, 2, 350000, 11, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (26, 2, 300000, 11, 3)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (27, 1, 400000, 13, 2)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (28, 1, 300000, 13, 3)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (29, 1, 350000, 12, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (30, 2, 350000, 15, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (31, 2, 350000, 16, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (32, 2, 350000, 17, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (33, 2, 350000, 18, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (34, 2, 350000, 19, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (35, 2, 350000, 20, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (36, 2, 350000, 21, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (37, 2, 350000, 22, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (38, 2, 350000, 23, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (39, 2, 350000, 24, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (40, 2, 350000, 25, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (41, 2, 350000, 26, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (42, 3, 350000, 27, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (43, 3, 350000, 28, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (44, 3, 350000, 29, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (45, 3, 350000, 30, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (46, 1, 400000, 31, 2)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (47, 1, 300000, 31, 3)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (48, 1, 350000, 31, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (49, 2, 400000, 32, 2)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (50, 1, 350000, 36, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (51, 1, 350000, 37, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (52, 1, 350000, 38, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (53, 1, 350000, 39, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (54, 2, 400000, 40, 2)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (55, 1, 350000, 41, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (56, 1, 350000, 42, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (57, 1, 350000, 43, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (58, 1, 350000, 44, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (59, 1, 350000, 45, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (60, 1, 350000, 46, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (61, 1, 350000, 47, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (62, 1, 350000, 51, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (63, 1, 350000, 52, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (64, 1, 350000, 56, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (65, 1, 350000, 57, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (66, 1, 350000, 58, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (67, 1, 350000, 59, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (68, 1, 350000, 61, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (69, 1, 350000, 62, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (70, 1, 350000, 63, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (71, 1, 350000, 64, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (72, 3, 350000, 66, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (73, 5, 350000, 67, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (74, 8, 350000, 68, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (75, 5, 350000, 72, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (76, 4, 350000, 73, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (77, 3, 350000, 74, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (78, 3, 350000, 75, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (79, 8, 350000, 76, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (80, 10, 350000, 78, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (81, 2, 350000, 79, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (82, 10, 350000, 80, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (83, 1, 200000, 81, 32)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (84, 10, 350000, 81, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (85, 10, 350000, 82, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (86, 10, 350000, 83, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (87, 10, 350000, 84, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (88, 10, 350000, 85, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (91, 1, 200000, 88, 32)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (92, 2, 350000, 88, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (93, 2, 350000, 89, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (94, 1, 400000, 89, 2)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (95, 5, 350000, 90, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (96, 5, 350000, 91, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (97, 5, 350000, 92, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (98, 5, 350000, 93, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (99, 1, 350000, 94, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (100, 2, 350000, 95, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (101, 2, 350000, 96, 1)
GO
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (102, 1, 200000, 96, 32)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (103, 2, 350000, 97, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (104, 1, 350000, 98, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (105, 50, 350000, 99, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (106, 20, 350000, 100, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (107, 2, 250000, 105, 13)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (110, 50, 350000, 107, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (114, 1, 350000, 114, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (115, 50, 350000, 115, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (116, 1, 400000, 115, 2)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (119, 2, 350000, 118, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (120, 1, 400000, 118, 2)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (121, 2, 350000, 119, 1)
INSERT [dbo].[OrderDetails] ([OrderDetail_Id], [Quantity], [Price], [OrderId], [ProductId]) VALUES (122, 1, 400000, 119, 2)
SET IDENTITY_INSERT [dbo].[OrderDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[OrderMethods] ON 

INSERT [dbo].[OrderMethods] ([OrderMethodId], [OrderMethodName]) VALUES (1, N'Thanh toán khi nhận hàng')
INSERT [dbo].[OrderMethods] ([OrderMethodId], [OrderMethodName]) VALUES (2, N'Thanh toán trực tuyến')
SET IDENTITY_INSERT [dbo].[OrderMethods] OFF
GO
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (1, CAST(N'2023-11-05T22:41:41.267' AS DateTime), 2, 700000, NULL, NULL, NULL, 1, 3, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (2, CAST(N'2023-11-05T22:44:12.380' AS DateTime), 5, 1650000, N'HT', N'0902584967 ', N'Ho Chi Minh', NULL, 4, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (3, CAST(N'2023-11-06T23:05:27.927' AS DateTime), 5, 1600000, NULL, NULL, NULL, 4, 4, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (4, CAST(N'2023-11-06T09:49:42.623' AS DateTime), 4, 1300000, NULL, NULL, NULL, 2, 4, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (5, CAST(N'2023-11-06T09:54:49.323' AS DateTime), 2, 800000, NULL, NULL, NULL, 1, 4, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (6, CAST(N'2023-11-07T10:22:14.103' AS DateTime), 6, 2200000, NULL, NULL, NULL, 3, 4, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (7, CAST(N'2023-11-08T10:22:55.983' AS DateTime), 5, 1810000, NULL, NULL, NULL, 4, 4, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (8, CAST(N'2023-11-08T10:23:58.827' AS DateTime), 7, 2600000, NULL, NULL, NULL, 1, 4, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (9, CAST(N'2023-11-08T10:24:00.230' AS DateTime), 2, 700000, NULL, NULL, NULL, 1, 5, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (10, CAST(N'2023-11-08T10:30:47.263' AS DateTime), 6, 1920000, NULL, NULL, NULL, 1, 3, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (11, CAST(N'2023-11-08T10:34:45.647' AS DateTime), 3, 1070000, NULL, NULL, NULL, 3, 6, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (12, CAST(N'2023-11-08T10:34:47.293' AS DateTime), 1, 350000, NULL, NULL, NULL, 4, 1, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (13, CAST(N'2023-11-08T10:35:35.127' AS DateTime), 2, 700000, NULL, NULL, NULL, 1, 5, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (14, CAST(N'2023-11-08T13:29:21.000' AS DateTime), 3, 1100000, NULL, NULL, NULL, 1, 3, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (15, CAST(N'2023-11-14T13:27:06.847' AS DateTime), 2, 568000, N'Khải', N'012548975  ', N'Tân Bình, TP.Hồ Chí Minh', 1, 4, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (16, CAST(N'2023-11-14T13:27:17.337' AS DateTime), 2, 568000, N'Khải', N'012548975  ', N'Tân Bình, TP.Hồ Chí Minh', 4, 2, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (17, CAST(N'2023-11-14T13:27:18.443' AS DateTime), 2, 568000, N'Khải', N'012548975  ', N'Tân Bình, TP.Hồ Chí Minh', 1, 4, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (18, CAST(N'2023-11-14T13:27:20.423' AS DateTime), 2, 568000, N'Khải', N'012548975  ', N'Tân Bình, TP.Hồ Chí Minh', 3, 3, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (19, CAST(N'2023-11-14T13:29:30.227' AS DateTime), 2, 668000, N'Khải', N'1234567899 ', N'Tân Bình, TP.Hồ Chí Minh', 2, 3, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (20, CAST(N'2023-11-14T13:34:35.023' AS DateTime), 2, 668000, N'Khải', N'1234567899 ', N'Tân Bình, TP.Hồ Chí Minh', 1, 4, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (21, CAST(N'2023-11-14T13:34:36.400' AS DateTime), 2, 668000, N'Khải', N'1234567899 ', N'Tân Bình, TP.Hồ Chí Minh', 1, 4, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (22, CAST(N'2023-11-14T13:34:42.680' AS DateTime), 2, 668000, N'Khải', N'1234567899 ', N'Tân Bình, TP.Hồ Chí Minh', 2, 4, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (23, CAST(N'2023-11-14T13:37:06.440' AS DateTime), 2, 668000, N'Khải', N'1234567899 ', N'Tân Bình, TP.Hồ Chí Minh', 1, 2, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (24, CAST(N'2023-11-14T13:42:47.157' AS DateTime), 2, 668000, N'Khải', N'1234567899 ', N'Tân Bình, TP.Hồ Chí Minh', 4, 1, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (25, CAST(N'2023-11-14T14:05:31.943' AS DateTime), 2, 668000, N'Khải', N'1234567899 ', N'Tân Bình, TP.Hồ Chí Minh', 1, 1, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (26, CAST(N'2023-11-14T14:17:46.953' AS DateTime), 2, 668000, N'Khải', N'1234567899 ', N'Tân Bình, TP.Hồ Chí Minh', 3, 1, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (27, CAST(N'2023-11-14T14:19:31.153' AS DateTime), 3, 1018000, N'Giang', N'1234567899 ', N'Quận 6, TP. Hồ Chí Minh', 2, 1, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (28, CAST(N'2023-11-14T14:20:29.260' AS DateTime), 3, 1018000, N'Giang', N'1234567899 ', N'Tân Bình, TP. Hồ Chí Minh', 2, 1, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (29, CAST(N'2023-11-14T14:21:14.630' AS DateTime), 3, 1018000, N'Giang', N'1234567899 ', N'Tân Bình, TP. Hồ Chí Minh', 1, 1, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (30, CAST(N'2023-11-14T14:24:38.570' AS DateTime), 3, 918000, N'Giang', N'1234567899 ', N'Tân Bình, TP. Hồ Chí Minh', 1, 1, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (31, CAST(N'2023-11-14T23:05:28.687' AS DateTime), 3, 1050000, NULL, NULL, NULL, 1, 3, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (32, CAST(N'2023-11-14T23:41:11.997' AS DateTime), 2, 800000, NULL, NULL, NULL, NULL, 1, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (36, CAST(N'2023-11-15T00:09:43.490' AS DateTime), 1, 350000, N'John', N'0343481278 ', N'Quận 10, TP. Hồ Chí Minh', NULL, 5, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (37, CAST(N'2023-11-15T00:26:38.567' AS DateTime), 1, 350000, NULL, NULL, NULL, 1, 1, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (38, CAST(N'2023-11-15T10:30:45.050' AS DateTime), 1, 318000, N'Giang', N'1234567899 ', N'Tân Bình, TP. Hồ Chí Minh', NULL, 2, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (39, CAST(N'2023-11-15T11:26:40.733' AS DateTime), 1, 350000, N'Phúc', N'0902257899 ', N'1209 Trường Sa, Quận 3, Thành phố Hồ Chí Minh', 1, 1, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (40, CAST(N'2023-11-15T11:27:54.780' AS DateTime), 2, 800000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 10, TP. Hồ Chí Minh', 1, 1, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (41, CAST(N'2023-11-15T16:54:19.863' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 10, TP. Hồ Chí Minh', NULL, 3, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (42, CAST(N'2023-11-15T17:06:00.223' AS DateTime), 1, 350000, N'Phuc', N'1234567899 ', N'Ho Chi Minh', NULL, 4, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (43, CAST(N'2023-11-15T22:08:41.987' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', 1, 4, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (44, CAST(N'2023-11-15T23:07:31.743' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', 3, 1, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (45, CAST(N'2023-11-15T23:37:40.370' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', 4, 2, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (46, CAST(N'2023-11-15T23:41:40.083' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', 2, 3, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (47, CAST(N'2023-11-16T00:30:21.700' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', 1, 3, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (48, CAST(N'2023-11-16T00:30:23.167' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', 2, 2, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (49, CAST(N'2023-11-16T00:30:26.183' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', 1, 2, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (50, CAST(N'2023-11-16T00:30:27.217' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', 2, 2, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (51, CAST(N'2023-11-16T00:31:06.907' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', 1, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (52, CAST(N'2023-11-21T15:01:17.750' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', 1, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (53, CAST(N'2023-11-21T15:08:40.847' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (54, CAST(N'2023-11-21T15:10:11.467' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (55, CAST(N'2023-11-21T15:12:22.000' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', 1, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (56, CAST(N'2023-11-21T15:17:11.620' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (57, CAST(N'2023-11-21T15:21:10.390' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (58, CAST(N'2023-11-21T15:22:50.767' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (59, CAST(N'2023-11-21T15:39:48.147' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', 1, 5, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (60, CAST(N'2023-11-21T15:39:49.777' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', 1, 5, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (61, CAST(N'2023-11-21T15:41:58.647' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (62, CAST(N'2023-11-21T15:45:31.353' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (63, CAST(N'2023-11-21T15:49:15.247' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (64, CAST(N'2023-11-21T15:52:10.680' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (65, CAST(N'2023-11-21T15:53:18.310' AS DateTime), 10, 3500000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (66, CAST(N'2023-11-21T15:53:51.677' AS DateTime), 3, 1050000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (67, CAST(N'2023-11-21T15:56:28.457' AS DateTime), 5, 1750000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (68, CAST(N'2023-11-21T15:58:42.830' AS DateTime), 8, 2800000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (69, CAST(N'2023-11-21T16:01:29.730' AS DateTime), 8, 2800000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (70, CAST(N'2023-11-21T16:05:18.753' AS DateTime), 4, 1400000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (71, CAST(N'2023-11-21T16:05:42.140' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (72, CAST(N'2023-11-21T16:08:29.360' AS DateTime), 5, 1750000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (73, CAST(N'2023-11-21T16:10:52.227' AS DateTime), 4, 1400000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (74, CAST(N'2023-11-21T16:12:07.827' AS DateTime), 3, 1050000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (75, CAST(N'2023-11-21T16:18:39.543' AS DateTime), 3, 1050000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (76, CAST(N'2023-11-21T16:19:56.967' AS DateTime), 8, 2800000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (77, CAST(N'2023-11-21T16:19:58.247' AS DateTime), 8, 2800000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (78, CAST(N'2023-11-21T16:21:18.953' AS DateTime), 10, 3500000, N'Tống Bảo Hiệp', N'0902257899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (79, CAST(N'2023-11-21T16:27:33.707' AS DateTime), 2, 700000, N'Tống Bảo Hiệp', N'0902257899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (80, CAST(N'2023-11-21T16:31:46.023' AS DateTime), 10, 3500000, N'Tống Bảo Hiệp', N'0902257899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (81, CAST(N'2023-11-21T16:33:44.143' AS DateTime), 11, 3700000, N'Tống Bảo Hiệp', N'0902257899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (82, CAST(N'2023-11-21T16:35:34.817' AS DateTime), 10, 3500000, N'a', N'0902257899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (83, CAST(N'2023-11-21T16:36:57.820' AS DateTime), 10, 3500000, N'a', N'0902257899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (84, CAST(N'2023-11-21T16:37:54.483' AS DateTime), 10, 3500000, N'aa', N'0902257899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (85, CAST(N'2023-11-21T16:38:42.803' AS DateTime), 10, 3500000, N'aa', N'0902257899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (88, CAST(N'2023-11-21T22:04:39.457' AS DateTime), 3, 900000, N'T', N'0902257899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 1, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (89, CAST(N'2023-11-21T22:25:34.193' AS DateTime), 3, 1068000, N'Giang', N'0902257899 ', N'Quận 3, TP. Hồ Chí Minh', NULL, 1, 1, NULL)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (90, CAST(N'2023-11-21T22:27:06.950' AS DateTime), 5, 1718000, N'Giang online', N'1234567899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 1, 2, NULL)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (91, CAST(N'2023-11-21T22:27:07.677' AS DateTime), 5, 1718000, N'Giang online', N'1234567899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 1, 2, NULL)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (92, CAST(N'2023-11-21T22:27:08.600' AS DateTime), 5, 1718000, N'Giang online', N'1234567899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 1, 2, NULL)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (93, CAST(N'2023-11-21T22:27:10.283' AS DateTime), 5, 1718000, N'Giang online', N'1234567899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 1, 2, NULL)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (94, CAST(N'2023-11-21T22:28:19.543' AS DateTime), 1, 318000, N'Giang online', N'1234567899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 2, 2, NULL)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (95, CAST(N'2023-11-21T22:31:11.840' AS DateTime), 2, 668000, N'Phúc', N'1234567899 ', N'Tân Bình, TP.Hồ Chí Minh', 1, 4, 1, NULL)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (96, CAST(N'2023-11-22T00:02:50.003' AS DateTime), 3, 868000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Phú Nhuận, TP. Hồ Chí Minh', 1, 4, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (97, CAST(N'2023-11-22T13:33:54.583' AS DateTime), 2, 568000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Phú Nhuận, TP. Hồ Chí Minh', 1, 4, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (98, CAST(N'2023-11-23T13:08:43.577' AS DateTime), 1, 318000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 4, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (99, CAST(N'2023-11-23T13:40:26.030' AS DateTime), 50, 17500000, N'Thanh', N'0902257899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 4, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (100, CAST(N'2023-11-23T13:40:44.767' AS DateTime), 20, 7000000, N'Thanh', N'0902257899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 4, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (101, CAST(N'2023-11-23T13:40:44.783' AS DateTime), 20, 7000000, N'Thanh', N'0902257899 ', N'Phú Nhuận, TP. Hồ Chí Minh', NULL, 4, 1, 2)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (105, CAST(N'2023-12-03T20:37:35.860' AS DateTime), 2, 500000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 10, TP. Hồ Chí Minh', 1, 4, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (107, CAST(N'2023-12-04T21:49:00.453' AS DateTime), 50, 17500000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 10, TP. Hồ Chí Minh', NULL, 4, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (110, CAST(N'2023-12-04T22:14:09.313' AS DateTime), 51, 17900000, N'Đặng Ngọc Phúc1', N'0902257899 ', N'Quận 10, TP. Hồ Chí Minh', NULL, 4, 2, 1)
GO
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (114, CAST(N'2023-12-04T22:23:25.093' AS DateTime), 1, 350000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 10, TP. Hồ Chí Minh', 1, 1, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (115, CAST(N'2023-12-04T22:27:01.123' AS DateTime), 51, 17900000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 10, TP. Hồ Chí Minh', 1, 1, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (116, CAST(N'2023-12-04T22:27:01.210' AS DateTime), 51, 17900000, N'Đặng Ngọc Phúc', N'0902257899 ', N'Quận 10, TP. Hồ Chí Minh', 1, 1, 1, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (118, CAST(N'2023-12-13T11:26:40.360' AS DateTime), 3, 1132000, N'khải nè', N'0376598347 ', N'Tân bình', NULL, 1, 2, 1)
INSERT [dbo].[Orders] ([OrderId], [OrderDate], [TotalQuantity], [TotalPrice], [NameCusNonAccount], [PhoneCusNonAccount], [AddressCusNonAccount], [CustomerId], [OrderStatusId], [OrderMethodId], [StoreId]) VALUES (119, CAST(N'2023-12-13T11:51:29.323' AS DateTime), 3, 1132000, N'khải nè', N'0376598347 ', N'Tân bình', NULL, 1, 2, 1)
SET IDENTITY_INSERT [dbo].[Orders] OFF
GO
SET IDENTITY_INSERT [dbo].[OrderStatus] ON 

INSERT [dbo].[OrderStatus] ([OrderStatusId], [OrderStatusName]) VALUES (1, N'Đã đặt hàng')
INSERT [dbo].[OrderStatus] ([OrderStatusId], [OrderStatusName]) VALUES (2, N'Đã xác nhận')
INSERT [dbo].[OrderStatus] ([OrderStatusId], [OrderStatusName]) VALUES (3, N'Đang vận chuyển')
INSERT [dbo].[OrderStatus] ([OrderStatusId], [OrderStatusName]) VALUES (4, N'Đã giao hàng')
INSERT [dbo].[OrderStatus] ([OrderStatusId], [OrderStatusName]) VALUES (5, N'Đã hủy')
INSERT [dbo].[OrderStatus] ([OrderStatusId], [OrderStatusName]) VALUES (6, N'Đã đánh giá')
SET IDENTITY_INSERT [dbo].[OrderStatus] OFF
GO
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (1, N'Ohara Rose', 350000, 1, N'/images/flo_1.png', 1, 1)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (2, N'Kamala ', 400000, 1, N'/images/flo_2.png', 1, 2)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (3, N'Little Tana', 300000, 1, N'/images/flo_3.png', 2, 3)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (13, N'ZangZang', 250000, 1, N'/images/flo_4.png', 3, 4)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (17, N'Sunflower', 370000, 1, N'/images/flo_5.png', 3, 1)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (18, N'MixRose', 299000, 1, N'/images/flo_6.png', 3, 1)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (20, N'Camellia', 340000, 1, N'/images/flo_7.png', 2, 1)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (22, N'
Jessamine', 420000, 1, N'/images/flo_8.png', 3, 1)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (26, N'Petunia', 450000, 1, N'/images/flo_9.png', 1, 1)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (27, N'Dahlia', 260000, 1, N'/images/flo_10.png', 1, 1)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (28, N'Magnolia', 350000, 1, N'/images/flo_11.png', 1, 1)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (29, N'Leilani', 350000, 1, N'/images/flo_12.png', 2, 2)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (30, N'Maryam', 300000, 1, N'/images/flo_13.png', 1, 1)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (31, N'Iris Raisa', 350000, 1, N'/images/flo_14.png', 1, 1)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (32, N'Sunflower', 200000, 1, N'/images/flo_15.png', 2, 5)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (33, N'Hoa 1', 200000, 1, N'/images/flo_16.png', 1, 6)
INSERT [dbo].[Products] ([ProductId], [ProductName], [Price], [Discount], [Image1], [CategoryId], [RecipeId]) VALUES (34, N'Rose ', 300000, 1, N'/images/flo_14.png', 1, 7)
SET IDENTITY_INSERT [dbo].[Products] OFF
GO
INSERT [dbo].[ProductViews] ([ProductViewId], [ProductId], [CustomerId], [ViewCount], [PurchaseCount]) VALUES (1, 1, 1, 7, 10)
INSERT [dbo].[ProductViews] ([ProductViewId], [ProductId], [CustomerId], [ViewCount], [PurchaseCount]) VALUES (2, 1, 2, 5, 2)
INSERT [dbo].[ProductViews] ([ProductViewId], [ProductId], [CustomerId], [ViewCount], [PurchaseCount]) VALUES (3, 2, 1, 10, 2)
GO
SET IDENTITY_INSERT [dbo].[Recipe] ON 

INSERT [dbo].[Recipe] ([RecipeId], [RecipeName]) VALUES (1, N'Công thức Ohara Rose')
INSERT [dbo].[Recipe] ([RecipeId], [RecipeName]) VALUES (2, N'Công thức Baby Flo')
INSERT [dbo].[Recipe] ([RecipeId], [RecipeName]) VALUES (3, N'Công thức Little Tana')
INSERT [dbo].[Recipe] ([RecipeId], [RecipeName]) VALUES (4, N'Công thức ZangZang')
INSERT [dbo].[Recipe] ([RecipeId], [RecipeName]) VALUES (5, N'Công thức Sunflower')
INSERT [dbo].[Recipe] ([RecipeId], [RecipeName]) VALUES (6, N'Công thức 6')
INSERT [dbo].[Recipe] ([RecipeId], [RecipeName]) VALUES (7, N'Công thức 7')
INSERT [dbo].[Recipe] ([RecipeId], [RecipeName]) VALUES (8, N'Test')
SET IDENTITY_INSERT [dbo].[Recipe] OFF
GO
SET IDENTITY_INSERT [dbo].[RecipeDetails] ON 

INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (1, 20, 1, 1)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (2, 5, 15, 1)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (3, 2, 19, 1)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (4, 10, 4, 2)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (5, 3, 11, 2)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (6, 2, 20, 2)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (7, 16, 5, 4)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (8, 15, 6, 4)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (9, 4, 20, 3)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (10, 14, 4, 3)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (11, 2, 20, 3)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (12, 10, 4, 5)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (13, 9, 10, 5)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (14, 12, 15, 5)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (15, 3, 20, 5)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (16, 2, 19, 5)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (17, 10, 7, 6)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (18, 10, 16, 6)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (19, 10, 6, 7)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (20, 20, 4, 7)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (21, 10, 9, 8)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (22, 5, 11, 8)
INSERT [dbo].[RecipeDetails] ([RecipeDetailId], [Quantity], [MaterialId], [RecipeId]) VALUES (23, 3, 16, 8)
SET IDENTITY_INSERT [dbo].[RecipeDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[Reviews] ON 

INSERT [dbo].[Reviews] ([ReviewId], [Star], [ContentReviews], [ReviewsDate], [ProductId], [CustomerId], [OrderId]) VALUES (1, 5, N'Beautiful', CAST(N'2023-12-11T16:05:07.347' AS DateTime), 1, 1, 1)
SET IDENTITY_INSERT [dbo].[Reviews] OFF
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([RoleId], [RoleName]) VALUES (1, N'Company')
INSERT [dbo].[Roles] ([RoleId], [RoleName]) VALUES (2, N'Store')
INSERT [dbo].[Roles] ([RoleId], [RoleName]) VALUES (3, N'Customer')
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[StockDetails] ON 

INSERT [dbo].[StockDetails] ([StockDetail_Id], [Quantity], [StoreId], [Material_Id]) VALUES (1, 70, 1, 1)
INSERT [dbo].[StockDetails] ([StockDetail_Id], [Quantity], [StoreId], [Material_Id]) VALUES (2, 55, 1, 2)
INSERT [dbo].[StockDetails] ([StockDetail_Id], [Quantity], [StoreId], [Material_Id]) VALUES (3, 30, 1, 3)
INSERT [dbo].[StockDetails] ([StockDetail_Id], [Quantity], [StoreId], [Material_Id]) VALUES (4, 35, 2, 1)
INSERT [dbo].[StockDetails] ([StockDetail_Id], [Quantity], [StoreId], [Material_Id]) VALUES (5, 30, 2, 2)
INSERT [dbo].[StockDetails] ([StockDetail_Id], [Quantity], [StoreId], [Material_Id]) VALUES (6, 20, 1, 12)
INSERT [dbo].[StockDetails] ([StockDetail_Id], [Quantity], [StoreId], [Material_Id]) VALUES (7, 10, 1, 5)
INSERT [dbo].[StockDetails] ([StockDetail_Id], [Quantity], [StoreId], [Material_Id]) VALUES (8, 10, 1, 11)
INSERT [dbo].[StockDetails] ([StockDetail_Id], [Quantity], [StoreId], [Material_Id]) VALUES (9, 10, 1, 10)
SET IDENTITY_INSERT [dbo].[StockDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[StoreDetails] ON 

INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (1, 15, 1, 1)
INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (2, 6, 1, 2)
INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (3, 18, 2, 1)
INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (4, 4, 1, 26)
INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (5, 2, 1, 27)
INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (6, 12, 1, 28)
INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (7, 5, 1, 29)
INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (8, 50, 1, 30)
INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (9, 2, 1, 31)
INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (10, 7, 1, 13)
INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (11, 6, 1, 17)
INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (12, 27, 1, 18)
INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (13, 19, 1, 20)
INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (14, 15, 1, 22)
INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (15, 9, 2, 32)
INSERT [dbo].[StoreDetails] ([StoreDetail_Id], [Quantity], [StoreId], [ProductId]) VALUES (16, 100, 1, 33)
SET IDENTITY_INSERT [dbo].[StoreDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[Stores] ON 

INSERT [dbo].[Stores] ([StoreId], [StoreName], [StorePhone], [StoreStreet], [StoreWard], [StoreDistrict], [StoreUserName], [StorePassword], [StoreStatus], [RoleId]) VALUES (1, N'SGF Store 1', N'0307050611 ', N'828 Sư Vạn Hạnh', N'Phường 12', N'Quận 10', N'store1', N'$2a$12$0EPpzRlXa/hltxHhPjBLs.vLRP40Y1BuF5NzKx4ss70hOdilzyk7e', 1, 2)
INSERT [dbo].[Stores] ([StoreId], [StoreName], [StorePhone], [StoreStreet], [StoreWard], [StoreDistrict], [StoreUserName], [StorePassword], [StoreStatus], [RoleId]) VALUES (2, N'SGF Store 2', N'0307784682 ', N'99 Nguyễn Trãi', N'Phường 6', N'Quận 1', N'store2', N'$2a$12$0EPpzRlXa/hltxHhPjBLs.vLRP40Y1BuF5NzKx4ss70hOdilzyk7e', 1, 2)
INSERT [dbo].[Stores] ([StoreId], [StoreName], [StorePhone], [StoreStreet], [StoreWard], [StoreDistrict], [StoreUserName], [StorePassword], [StoreStatus], [RoleId]) VALUES (3, N'SGF Store 3', N'0965487953 ', N'1120 Trường Sa', N'Phường 12', N'Quận 3', N'store3', N'$2a$12$0EPpzRlXa/hltxHhPjBLs.vLRP40Y1BuF5NzKx4ss70hOdilzyk7e', 0, 2)
INSERT [dbo].[Stores] ([StoreId], [StoreName], [StorePhone], [StoreStreet], [StoreWard], [StoreDistrict], [StoreUserName], [StorePassword], [StoreStatus], [RoleId]) VALUES (4, N'SGF Store 4', N'0789458979 ', N'684 Cộng Hòa', N'Phường 10', N'Quận Tân Bình', N'store4', N'$2a$12$0EPpzRlXa/hltxHhPjBLs.vLRP40Y1BuF5NzKx4ss70hOdilzyk7e', 1, 2)
INSERT [dbo].[Stores] ([StoreId], [StoreName], [StorePhone], [StoreStreet], [StoreWard], [StoreDistrict], [StoreUserName], [StorePassword], [StoreStatus], [RoleId]) VALUES (5, N'SGF Store 5', N'0965487953 ', N'200 Mai Văn Thưởng', N'Phường 1', N'Quận 6', N'store5', N'$2a$10$ifW3Ihqf2Q0bGf0jT23PV.xXdhhpJ3HdjDY7eATjcnQmq1PteK4YW', 1, 2)
INSERT [dbo].[Stores] ([StoreId], [StoreName], [StorePhone], [StoreStreet], [StoreWard], [StoreDistrict], [StoreUserName], [StorePassword], [StoreStatus], [RoleId]) VALUES (6, N'SGF Store 6', N'0965487953 ', N'87 Trần Quang Diệu', N'Phường 10', N'Quận 3', N'store6', N'$2a$10$F1XuSVze2YhXSgSaPRZQT.DzBFVJj9Y9y6ntdun5uK//JtJQtNTzq', 0, 2)
SET IDENTITY_INSERT [dbo].[Stores] OFF
GO
SET IDENTITY_INSERT [dbo].[Vouchers] ON 

INSERT [dbo].[Vouchers] ([VoucherId], [VoucherName], [VoucherPoint], [VoucherValue], [VoucherQuantity], [DateExpire], [CompanyId]) VALUES (1, N'Christmas Sale', 2000, 100000, 29, CAST(N'2023-12-26T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[Vouchers] ([VoucherId], [VoucherName], [VoucherPoint], [VoucherValue], [VoucherQuantity], [DateExpire], [CompanyId]) VALUES (2, N'20-11', 10000, 100000, 50, CAST(N'2023-11-22T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[Vouchers] ([VoucherId], [VoucherName], [VoucherPoint], [VoucherValue], [VoucherQuantity], [DateExpire], [CompanyId]) VALUES (4, N'Sale tháng 11', 2000, 150000, 99, CAST(N'2023-11-30T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[Vouchers] ([VoucherId], [VoucherName], [VoucherPoint], [VoucherValue], [VoucherQuantity], [DateExpire], [CompanyId]) VALUES (5, N'Voucher 1', 1000, 200000, 50, CAST(N'2023-11-20T00:00:00.000' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Vouchers] OFF
GO
ALTER TABLE [dbo].[Company]  WITH CHECK ADD  CONSTRAINT [FK_Company_Roles] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([RoleId])
GO
ALTER TABLE [dbo].[Company] CHECK CONSTRAINT [FK_Company_Roles]
GO
ALTER TABLE [dbo].[DetailVouchers]  WITH CHECK ADD  CONSTRAINT [FK_DetailVouchers_Customers] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([CustomerId])
GO
ALTER TABLE [dbo].[DetailVouchers] CHECK CONSTRAINT [FK_DetailVouchers_Customers]
GO
ALTER TABLE [dbo].[DetailVouchers]  WITH CHECK ADD  CONSTRAINT [FK_DetailVouchers_Vouchers] FOREIGN KEY([VoucherId])
REFERENCES [dbo].[Vouchers] ([VoucherId])
GO
ALTER TABLE [dbo].[DetailVouchers] CHECK CONSTRAINT [FK_DetailVouchers_Vouchers]
GO
ALTER TABLE [dbo].[Export]  WITH CHECK ADD  CONSTRAINT [FK_Export_Company] FOREIGN KEY([ExportFrom])
REFERENCES [dbo].[Company] ([CompanyId])
GO
ALTER TABLE [dbo].[Export] CHECK CONSTRAINT [FK_Export_Company]
GO
ALTER TABLE [dbo].[Export]  WITH CHECK ADD  CONSTRAINT [FK_Export_Import] FOREIGN KEY([ImportId])
REFERENCES [dbo].[Import] ([ImportId])
GO
ALTER TABLE [dbo].[Export] CHECK CONSTRAINT [FK_Export_Import]
GO
ALTER TABLE [dbo].[Functions]  WITH CHECK ADD  CONSTRAINT [FK_Functions_Roles] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([RoleId])
GO
ALTER TABLE [dbo].[Functions] CHECK CONSTRAINT [FK_Functions_Roles]
GO
ALTER TABLE [dbo].[Import]  WITH CHECK ADD  CONSTRAINT [FK_Import_IE_Status] FOREIGN KEY([IEStatusId])
REFERENCES [dbo].[IE_Status] ([IEStatusId])
GO
ALTER TABLE [dbo].[Import] CHECK CONSTRAINT [FK_Import_IE_Status]
GO
ALTER TABLE [dbo].[Import]  WITH CHECK ADD  CONSTRAINT [FK_Import_Stores] FOREIGN KEY([StoreId])
REFERENCES [dbo].[Stores] ([StoreId])
GO
ALTER TABLE [dbo].[Import] CHECK CONSTRAINT [FK_Import_Stores]
GO
ALTER TABLE [dbo].[ImportDetails]  WITH CHECK ADD  CONSTRAINT [FK_ImportDetails_Import] FOREIGN KEY([ImportId])
REFERENCES [dbo].[Import] ([ImportId])
GO
ALTER TABLE [dbo].[ImportDetails] CHECK CONSTRAINT [FK_ImportDetails_Import]
GO
ALTER TABLE [dbo].[ImportDetails]  WITH CHECK ADD  CONSTRAINT [FK_ImportDetails_Materials] FOREIGN KEY([Material_Id])
REFERENCES [dbo].[Materials] ([Material_Id])
GO
ALTER TABLE [dbo].[ImportDetails] CHECK CONSTRAINT [FK_ImportDetails_Materials]
GO
ALTER TABLE [dbo].[Likes]  WITH CHECK ADD FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([CustomerId])
GO
ALTER TABLE [dbo].[Likes]  WITH CHECK ADD FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([ProductId])
GO
ALTER TABLE [dbo].[News]  WITH CHECK ADD  CONSTRAINT [FK_News_Company] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Company] ([CompanyId])
GO
ALTER TABLE [dbo].[News] CHECK CONSTRAINT [FK_News_Company]
GO
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetails_Orders] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Orders] ([OrderId])
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK_OrderDetails_Orders]
GO
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetails_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([ProductId])
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK_OrderDetails_Products]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Customers] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([CustomerId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Customers]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_OrderMethods] FOREIGN KEY([OrderMethodId])
REFERENCES [dbo].[OrderMethods] ([OrderMethodId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_OrderMethods]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_OrderStatus] FOREIGN KEY([OrderStatusId])
REFERENCES [dbo].[OrderStatus] ([OrderStatusId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_OrderStatus]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Stores] FOREIGN KEY([StoreId])
REFERENCES [dbo].[Stores] ([StoreId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Stores]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Categories] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Categories] ([CategoryId])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Categories]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Recipe] FOREIGN KEY([RecipeId])
REFERENCES [dbo].[Recipe] ([RecipeId])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Recipe]
GO
ALTER TABLE [dbo].[ProductViews]  WITH CHECK ADD  CONSTRAINT [FK_ProductView_Customers] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([CustomerId])
GO
ALTER TABLE [dbo].[ProductViews] CHECK CONSTRAINT [FK_ProductView_Customers]
GO
ALTER TABLE [dbo].[ProductViews]  WITH CHECK ADD  CONSTRAINT [FK_ProductView_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([ProductId])
GO
ALTER TABLE [dbo].[ProductViews] CHECK CONSTRAINT [FK_ProductView_Products]
GO
ALTER TABLE [dbo].[RecipeDetails]  WITH CHECK ADD  CONSTRAINT [FK_RecipeDetail_RecipeDetail] FOREIGN KEY([RecipeId])
REFERENCES [dbo].[Recipe] ([RecipeId])
GO
ALTER TABLE [dbo].[RecipeDetails] CHECK CONSTRAINT [FK_RecipeDetail_RecipeDetail]
GO
ALTER TABLE [dbo].[RecipeDetails]  WITH CHECK ADD  CONSTRAINT [FK_RecipeDetails_Materials] FOREIGN KEY([MaterialId])
REFERENCES [dbo].[Materials] ([Material_Id])
GO
ALTER TABLE [dbo].[RecipeDetails] CHECK CONSTRAINT [FK_RecipeDetails_Materials]
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD  CONSTRAINT [FK_Reviews_Customers] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([CustomerId])
GO
ALTER TABLE [dbo].[Reviews] CHECK CONSTRAINT [FK_Reviews_Customers]
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD  CONSTRAINT [FK_Reviews_Orders] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Orders] ([OrderId])
GO
ALTER TABLE [dbo].[Reviews] CHECK CONSTRAINT [FK_Reviews_Orders]
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD  CONSTRAINT [FK_Reviews_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([ProductId])
GO
ALTER TABLE [dbo].[Reviews] CHECK CONSTRAINT [FK_Reviews_Products]
GO
ALTER TABLE [dbo].[StockDetails]  WITH CHECK ADD  CONSTRAINT [FK_StockDetails_Materials] FOREIGN KEY([Material_Id])
REFERENCES [dbo].[Materials] ([Material_Id])
GO
ALTER TABLE [dbo].[StockDetails] CHECK CONSTRAINT [FK_StockDetails_Materials]
GO
ALTER TABLE [dbo].[StockDetails]  WITH CHECK ADD  CONSTRAINT [FK_StockDetails_Stores] FOREIGN KEY([StoreId])
REFERENCES [dbo].[Stores] ([StoreId])
GO
ALTER TABLE [dbo].[StockDetails] CHECK CONSTRAINT [FK_StockDetails_Stores]
GO
ALTER TABLE [dbo].[StoreDetails]  WITH CHECK ADD  CONSTRAINT [FK_StoreDetails_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([ProductId])
GO
ALTER TABLE [dbo].[StoreDetails] CHECK CONSTRAINT [FK_StoreDetails_Products]
GO
ALTER TABLE [dbo].[StoreDetails]  WITH CHECK ADD  CONSTRAINT [FK_StoreDetails_Stores] FOREIGN KEY([StoreId])
REFERENCES [dbo].[Stores] ([StoreId])
GO
ALTER TABLE [dbo].[StoreDetails] CHECK CONSTRAINT [FK_StoreDetails_Stores]
GO
ALTER TABLE [dbo].[Stores]  WITH CHECK ADD  CONSTRAINT [FK_Stores_Roles] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([RoleId])
GO
ALTER TABLE [dbo].[Stores] CHECK CONSTRAINT [FK_Stores_Roles]
GO
ALTER TABLE [dbo].[Vouchers]  WITH CHECK ADD  CONSTRAINT [FK_Vouchers_Company] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Company] ([CompanyId])
GO
ALTER TABLE [dbo].[Vouchers] CHECK CONSTRAINT [FK_Vouchers_Company]
GO
/****** Object:  StoredProcedure [dbo].[ChangeLikeStatus]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ChangeLikeStatus]
@cusId int,
@proId int
AS
BEGIN
	begin tran
		begin try
			update Likes 
			set LikeStatus = 1 
			where CustomerId = @cusId and ProductId = @proId
			commit tran
			return
		end try
		begin catch
			rollback tran
			return 
		end catch
END
GO
/****** Object:  StoredProcedure [dbo].[CreateProduct]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateProduct]
    @StoreId INT,
    @RecipeId INT,
    @QuantityToProduce INT,
	@ProductId INT
   
AS
BEGIN


    -- Truy vấn để lấy chi tiết công thức và số lượng nguyên liệu cần
    WITH RecipeIngredients AS (
        SELECT rd.MaterialId, rd.Quantity * @QuantityToProduce AS RequiredQuantity
        FROM [FlowerStore].[dbo].[RecipeDetails] rd
        WHERE rd.RecipeId = @RecipeId
    )

    -- Cập nhật số lượng nguyên liệu trong kho (tương tự câu truy vấn trước)
    UPDATE sd
    SET sd.Quantity = sd.Quantity - ri.RequiredQuantity
    FROM [FlowerStore].[dbo].[StockDetails] sd
    JOIN RecipeIngredients ri ON sd.Material_Id = ri.MaterialId
    WHERE sd.StoreId = @StoreId;

   

    

    -- Sau đó, thêm số lượng sản phẩm vào bảng StoreDetails
    INSERT INTO [FlowerStore].[dbo].[StoreDetails] (Quantity, StoreId, ProductId)
    VALUES (@QuantityToProduce, @StoreId, @ProductId);
END;
GO
/****** Object:  StoredProcedure [dbo].[GetProductByStoreId]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetProductByStoreId]
    @StoreId INT
AS
BEGIN
    SELECT 
        p.[ProductId],
        p.[ProductName],
        p.[Price],
        p.[Discount],
        p.[Image1],
        p.[CategoryId],
        p.[RecipeId],
        r.[RecipeName],
        c.[CategoryName],
        sd.[StoreDetail_Id],
        sd.[Quantity],
        s.[StoreId],
        s.[StoreName],
        s.[RoleId]
    FROM [FlowerStore].[dbo].[Products] p
    LEFT JOIN [FlowerStore].[dbo].[Recipe] r ON p.[RecipeId] = r.[RecipeId]
    LEFT JOIN [FlowerStore].[dbo].[Categories] c ON p.[CategoryId] = c.[CategoryId]
    LEFT JOIN [FlowerStore].[dbo].[StoreDetails] sd ON p.[ProductId] = sd.[ProductId]
    LEFT JOIN [FlowerStore].[dbo].[Stores] s ON sd.[StoreId] = s.[StoreId]
    WHERE s.[StoreId] = @StoreId
END
GO
/****** Object:  StoredProcedure [dbo].[GetProductFull]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetProductFull]
AS
BEGIN
    SELECT 
        p.[ProductId],
        p.[ProductName],
        p.[Price],
        p.[Discount],
        p.[Image1],
        p.[CategoryId],
        p.[RecipeId],
        r.[RecipeName],
        c.[CategoryName],
        sd.[StoreDetail_Id],
        sd.[Quantity],
        s.[StoreId],
        s.[StoreName],
        s.[RoleId]
    FROM [FlowerStore].[dbo].[Products] p
    LEFT JOIN [FlowerStore].[dbo].[Recipe] r ON p.[RecipeId] = r.[RecipeId]
    LEFT JOIN [FlowerStore].[dbo].[Categories] c ON p.[CategoryId] = c.[CategoryId]
    LEFT JOIN [FlowerStore].[dbo].[StoreDetails] sd ON p.[ProductId] = sd.[ProductId]
    LEFT JOIN [FlowerStore].[dbo].[Stores] s ON sd.[StoreId] = s.[StoreId]
END
GO
/****** Object:  StoredProcedure [dbo].[GetProductsByCategory]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetProductsByCategory]
@cateId int
AS
BEGIN
	select Products.*,Categories.CategoryName
	from Products
	join Categories on Products.CategoryId = Categories.CategoryId
	where Products.CategoryId = @cateId
END
GO
/****** Object:  StoredProcedure [dbo].[statisticOrderOfCus]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[statisticOrderOfCus]	
       @Month INT,
	   @Year INT
AS
BEGIN
	
  SELECT
        od.CustomerId,
		COUNT(*) AS TotalOrder,
        SUM(od.TotalQuantity) AS TotalQuantity,
        SUM(od.TotalPrice) AS TotalPrice,
        cus.CustomerName,
        cus.CustomerPhone
    FROM Orders od
    LEFT JOIN Customers cus ON od.CustomerId = cus.CustomerId
    WHERE
        od.OrderStatusId = 4
        AND od.CustomerId IS NOT NULL
	    AND MONTH(od.OrderDate) =  @Month
		AND YEAR(od.OrderDate) = @Year
    GROUP BY
        od.CustomerId,
        cus.CustomerName,
        cus.CustomerPhone
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateImportStatus]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateImportStatus]
@importId int,
@statusId int,
@date datetime
AS
BEGIN
	begin tran
		begin try
			if(@statusId = 2)
			begin
				update Import
				set IEStatusId = @statusId, ExportDate = @date
				where ImportId = @importId
				commit tran
				return 
			end
				update Import
				set IEStatusId = @statusId ,ImportDate = @date
				where ImportId = @importId
				commit tran
				return 
		end try
		begin catch
			rollback tran
			return 
		end catch
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateLikeStatus]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateLikeStatus]
@cusId int,
@proId int
AS
BEGIN
	begin tran
		begin try
			update Likes 
			set LikeStatus = 0 
			where CustomerId = @cusId and ProductId = @proId
			commit tran
			return
		end try
		begin catch
			rollback tran
			return 
		end catch
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateStockDetails]    Script Date: 12/29/2023 11:59:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateStockDetails]
@storeId int,
@materialId int,
@quantity int  
AS
BEGIN
	begin tran
		begin try
				update StockDetails
				set  Quantity += @quantity
				where StoreId = @storeId and Material_Id = @materialId
				commit tran
				return 
		end try
		begin catch
			rollback tran
			return 
		end catch
END
GO
USE [master]
GO
ALTER DATABASE [FlowerStore] SET  READ_WRITE 
GO
