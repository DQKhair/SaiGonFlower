using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FlowerStore.Models
{
    public partial class FlowerStoreContext : DbContext
    {
        public FlowerStoreContext()
        {
        }

        public FlowerStoreContext(DbContextOptions<FlowerStoreContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Company> Companies { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<DetailVoucher> DetailVouchers { get; set; } = null!;
        public virtual DbSet<Export> Exports { get; set; } = null!;
        public virtual DbSet<Function> Functions { get; set; } = null!;
        public virtual DbSet<IeStatus> IeStatuses { get; set; } = null!;
        public virtual DbSet<Import> Imports { get; set; } = null!;
        public virtual DbSet<ImportDetail> ImportDetails { get; set; } = null!;
        public virtual DbSet<Material> Materials { get; set; } = null!;
        public virtual DbSet<News> News { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderDetail> OrderDetails { get; set; } = null!;
        public virtual DbSet<OrderMethod> OrderMethods { get; set; } = null!;
        public virtual DbSet<OrderStatus> OrderStatuses { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<ProductFull> ProductFull { get; set; } = null!;
        public virtual DbSet<Recipe> Recipes { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<StockDetail> StockDetails { get; set; } = null!;
        public virtual DbSet<Store> Stores { get; set; } = null!;
        public virtual DbSet<StoreDetail> StoreDetails { get; set; } = null!;
        public virtual DbSet<Voucher> Vouchers { get; set; } = null!;
        public virtual DbSet<RecipeDetail> RecipeDetails { get; set; } = null!;
        public virtual DbSet<CountIndex> CountIndex { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
               //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=K02\\MSSQLSERVER1;Initial Catalog=FlowerStore;Integrated Security=True");
            }
        }

        public void CallYourStoredProcedure(int storeId, int recipeId, int quantityToProduce, int productId)
        {
            // Sử dụng phương thức FromSqlRaw để gọi stored procedure
            Database.ExecuteSqlInterpolated($"EXEC CreateProduct {storeId}, {recipeId}, {quantityToProduce}, {productId}");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.CategoryName).HasMaxLength(50);
            });

            modelBuilder.Entity<ProductFull>(entity =>
            {
                entity.HasNoKey();
            });

            modelBuilder.Entity<Company>(entity =>
            {
                entity.ToTable("Company");

                entity.Property(e => e.CompanyUserName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PassWordCompany).HasMaxLength(100);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Companies)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK_Company_Roles");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.CustomerAddress).HasMaxLength(50);

                entity.Property(e => e.CustomerName).HasMaxLength(50);

                entity.Property(e => e.CustomerPassword).HasMaxLength(100);

                entity.Property(e => e.CustomerPhone)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.CustomerUserName)
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<DetailVoucher>(entity =>
            {
                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.DetailVouchers)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_DetailVouchers_Customers");

                entity.HasOne(d => d.Voucher)
                    .WithMany(p => p.DetailVouchers)
                    .HasForeignKey(d => d.VoucherId)
                    .HasConstraintName("FK_DetailVouchers_Vouchers");
            });

            modelBuilder.Entity<Export>(entity =>
            {
                entity.ToTable("Export");

                entity.Property(e => e.ExportDate).HasColumnType("datetime");

                entity.HasOne(d => d.ExportFromNavigation)
                    .WithMany(p => p.Exports)
                    .HasForeignKey(d => d.ExportFrom)
                    .HasConstraintName("FK_Export_Company");

                entity.HasOne(d => d.Import)
                    .WithMany(p => p.Exports)
                    .HasForeignKey(d => d.ImportId)
                    .HasConstraintName("FK_Export_Import");
            });

            modelBuilder.Entity<Function>(entity =>
            {
                entity.Property(e => e.FunctionName).HasMaxLength(50);

                entity.Property(e => e.Route).HasMaxLength(200);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Functions)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK_Functions_Roles");
            });

            modelBuilder.Entity<IeStatus>(entity =>
            {
                entity.ToTable("IE_Status");

                entity.Property(e => e.IestatusId).HasColumnName("IEStatusId");

                entity.Property(e => e.IestatusName)
                    .HasMaxLength(50)
                    .HasColumnName("IEStatusName");
            });

            modelBuilder.Entity<Import>(entity =>
            {
                entity.ToTable("Import");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IestatusId).HasColumnName("IEStatusId");

                entity.Property(e => e.ImportDate).HasColumnType("datetime");

                entity.HasOne(d => d.Iestatus)
                    .WithMany(p => p.Imports)
                    .HasForeignKey(d => d.IestatusId)
                    .HasConstraintName("FK_Import_IE_Status");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.Imports)
                    .HasForeignKey(d => d.StoreId)
                    .HasConstraintName("FK_Import_Stores");
            });

            modelBuilder.Entity<ImportDetail>(entity =>
            {
                entity.Property(e => e.ImportDetailId).HasColumnName("ImportDetail_Id");

                entity.Property(e => e.MaterialId).HasColumnName("Material_Id");

                entity.HasOne(d => d.Import)
                    .WithMany(p => p.ImportDetails)
                    .HasForeignKey(d => d.ImportId)
                    .HasConstraintName("FK_ImportDetails_Import");

                entity.HasOne(d => d.Material)
                    .WithMany(p => p.ImportDetails)
                    .HasForeignKey(d => d.MaterialId)
                    .HasConstraintName("FK_ImportDetails_Materials");
            });

            modelBuilder.Entity<Material>(entity =>
            {
                entity.Property(e => e.MaterialId).HasColumnName("Material_Id");

                entity.Property(e => e.MaterialName).HasMaxLength(50);
            });

            modelBuilder.Entity<News>(entity =>
            {
                entity.Property(e => e.NewsDate).HasColumnType("datetime");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.News)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("FK_News_Company");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.AddressCusNonAccount).HasMaxLength(100);

                entity.Property(e => e.NameCusNonAccount).HasMaxLength(50);

                entity.Property(e => e.OrderDate).HasColumnType("datetime");

                entity.Property(e => e.PhoneCusNonAccount)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_Orders_Customers");

                entity.HasOne(d => d.OrderMethod)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.OrderMethodId)
                    .HasConstraintName("FK_Orders_OrderMethods");

                entity.HasOne(d => d.OrderStatus)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.OrderStatusId)
                    .HasConstraintName("FK_Orders_OrderStatus");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.StoreId)
                    .HasConstraintName("FK_Orders_Stores");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.Property(e => e.OrderDetailId).HasColumnName("OrderDetail_Id");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK_OrderDetails_Orders");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_OrderDetails_Products");
            });

            modelBuilder.Entity<OrderMethod>(entity =>
            {
                entity.Property(e => e.OrderMethodName).HasMaxLength(50);
            });

            modelBuilder.Entity<OrderStatus>(entity =>
            {
                entity.ToTable("OrderStatus");

                entity.Property(e => e.OrderStatusName).HasMaxLength(50);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.ProductName).HasMaxLength(50);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_Products_Categories");

                entity.HasOne(d => d.Recipe)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.RecipeId)
                    .HasConstraintName("FK_Products_Recipe");
            });

            modelBuilder.Entity<Recipe>(entity =>
            {
                entity.ToTable("Recipe");

                entity.Property(e => e.RecipeName).HasMaxLength(200);
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.RoleName).HasMaxLength(50);
            });

            modelBuilder.Entity<StockDetail>(entity =>
            {
                entity.Property(e => e.StockDetailId).HasColumnName("StockDetail_Id");

                entity.Property(e => e.MaterialId).HasColumnName("Material_Id");

                entity.HasOne(d => d.Material)
                    .WithMany(p => p.StockDetails)
                    .HasForeignKey(d => d.MaterialId)
                    .HasConstraintName("FK_StockDetails_Materials");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.StockDetails)
                    .HasForeignKey(d => d.StoreId)
                    .HasConstraintName("FK_StockDetails_Stores");
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.Property(e => e.StoreDistrict).HasMaxLength(30);

                entity.Property(e => e.StoreName).HasMaxLength(50);

                entity.Property(e => e.StorePassword).HasMaxLength(100);

                entity.Property(e => e.StorePhone)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.StoreStreet).HasMaxLength(50);

                entity.Property(e => e.StoreUserName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.StoreWard).HasMaxLength(30);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Stores)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK_Stores_Roles");
            });

            modelBuilder.Entity<StoreDetail>(entity =>
            {
                entity.Property(e => e.StoreDetailId).HasColumnName("StoreDetail_Id");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.StoreDetails)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_StoreDetails_Products");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.StoreDetails)
                    .HasForeignKey(d => d.StoreId)
                    .HasConstraintName("FK_StoreDetails_Stores");
            });

            modelBuilder.Entity<Voucher>(entity =>
            {
                entity.Property(e => e.DateExpire).HasColumnType("datetime");

                entity.Property(e => e.VoucherName).HasMaxLength(50);

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Vouchers)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("FK_Vouchers_Company");
            });

            modelBuilder.Entity<RecipeDetail>(entity =>
            {
                entity.HasOne(d => d.Recipe)
                        .WithMany(p => p.RecipeDetail)
                        .HasForeignKey(d => d.RecipeId)
                        .HasConstraintName("FK_RecipeDetail_RecipeDetail");

                entity.HasOne(d => d.Material)
                        .WithMany(p => p.RecipeDetails)
                        .HasForeignKey(d => d.MaterialId)
                        .HasConstraintName("FK_RecipeDetails_Materials");
            });

            modelBuilder.Entity<CountIndex>(entity =>
            {
                entity.HasKey(b => b.Id).HasName("Id");
                entity.Property(e => e.Date).HasColumnType("date");

            });
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
