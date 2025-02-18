using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class WarrantyConfiguration : IEntityTypeConfiguration<Warranty>
{
    public void Configure(EntityTypeBuilder<Warranty> builder)
    {
        builder.Property(x => x.AdditionalInformation).HasColumnType("varchar(800)");
        builder.Property(x => x.Price).HasColumnType("decimal(18,2)");
    }
}
