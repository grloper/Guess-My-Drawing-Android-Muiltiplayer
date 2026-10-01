using OfekVentura_Project;
using System.Globalization;
CultureInfo.CurrentCulture = new CultureInfo("tr-TR");
Parallel.For(0, 10000, _ => {
    var words = PictionaryWordGenerator.GetRandomWords();
    if (words.Count != 3 || words.Distinct(StringComparer.OrdinalIgnoreCase).Count() != 3)
        throw new Exception("Duplicate choices");
    if (words.Any(w => w != w.ToUpperInvariant())) throw new Exception("Culture-dependent choice");
});
Console.WriteLine("PASS: 10,000 concurrent draws; three distinct invariant choices each.");
