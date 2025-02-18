namespace Core.Entities;

public class Warranty : BaseEntity
{
    public required string ShortName { get; set; }
    public required string AdditionalInformation { get; set; }
    public required string Description { get; set; }
    public decimal Price { get; set; }
    public required string PictureUrl { get; set; }
    public bool  Estado { get; set; }
}
